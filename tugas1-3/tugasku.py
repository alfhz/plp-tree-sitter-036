import sys
import time

import tree_sitter_python as tspython
from tree_sitter import Language, Parser

parser = Parser(Language(tspython.language()))

SATU_FUNGSI = b"def sapa(nama):\n    return 'halo ' + nama\n"
FILE_TUGAS_1 = "t1.py"
FILE_NYATA = sys.argv[1] if len(sys.argv) > 1 else "file_nyata.py"


def baca_file(path):
    """Baca file sebagai bytes, kembalikan None kalau tidak ada."""
    try:
        with open(path, "rb") as f:
            return f.read()
    except FileNotFoundError:
        return None


def hitung_statistik(tree):
    """Telusuri seluruh tree secara iteratif (tanpa rekursi)."""
    stat = {"total": 0, "bernama": 0, "anonim": 0, "error": 0,
            "missing": 0, "kedalaman": 0}
    cursor = tree.walk()
    kedalaman = 0
    while True:
        node = cursor.node
        stat["total"] += 1
        stat["bernama" if node.is_named else "anonim"] += 1
        if node.type == "ERROR":
            stat["error"] += 1
        if node.is_missing:
            stat["missing"] += 1
        stat["kedalaman"] = max(stat["kedalaman"], kedalaman)

        if cursor.goto_first_child():
            kedalaman += 1
            continue
        while not cursor.goto_next_sibling():
            if not cursor.goto_parent():
                return stat
            kedalaman -= 1


def analisis(label, kode):
    if kode is None:
        print(f"== {label} ==")
        print("  file tidak ditemukan, dilewati\n")
        return None

    mulai = time.perf_counter()
    tree = parser.parse(kode)
    durasi_ms = (time.perf_counter() - mulai) * 1000
    stat = hitung_statistik(tree)
    baris = kode.count(b"\n") + (0 if kode.endswith(b"\n") else 1)

    print(f"== {label} ==")
    print(f"  ukuran        : {len(kode)} byte, {baris} baris")
    print(f"  total node    : {stat['total']}")
    print(f"  node bernama  : {stat['bernama']}")
    print(f"  node anonim   : {stat['anonim']}")
    print(f"  kedalaman maks: {stat['kedalaman']}")
    print(f"  ERROR/MISSING : {stat['error']}/{stat['missing']}")
    print(f"  has_error     : {tree.root_node.has_error}")
    print(f"  waktu parse   : {durasi_ms:.3f} ms\n")
    return stat["total"], baris


def hitung_jenis_node(tree):
    jumlah = {}
    cursor = tree.walk()
    while True:
        jenis = cursor.node.type
        jumlah[jenis] = jumlah.get(jenis, 0) + 1
        if cursor.goto_first_child():
            continue
        while not cursor.goto_next_sibling():
            if not cursor.goto_parent():
                return jumlah


def cetak_jenis_teratas(kode, batas=5):
    tree = parser.parse(kode)
    jumlah = hitung_jenis_node(tree)
    urut = sorted(jumlah.items(), key=lambda item: item[1], reverse=True)
    print(f"  {batas} jenis node terbanyak:")
    for jenis, banyak in urut[:batas]:
        print(f"    {jenis:<25} {banyak}")
    print()


def cetak_tree(node, kode, maks_kedalaman=2, kedalaman=0):
    if kedalaman > maks_kedalaman:
        return
    jenis = "bernama" if node.is_named else "anonim"
    teks = kode[node.start_byte:node.end_byte].decode("utf-8", "replace")
    teks = teks.replace("\n", " ")[:30]
    print(f"{'  ' * kedalaman}{node.type} ({jenis}) '{teks}'")
    for anak in node.children:
        cetak_tree(anak, kode, maks_kedalaman, kedalaman + 1)


def cetak_anak_pertama(label, kode):
    if kode is None:
        return
    tree = parser.parse(kode)
    print(f"-- anak pertama root: {label} --")
    cetak_tree(tree.root_node, kode, maks_kedalaman=1)
    print()


def main():
    tahap = [
        ("Tahap 1 - satu fungsi", SATU_FUNGSI),
        (f"Tahap 2 - Tugas 1 ({FILE_TUGAS_1})", baca_file(FILE_TUGAS_1)),
        (f"Tahap 3 - file nyata ({FILE_NYATA})", baca_file(FILE_NYATA)),
    ]

    hasil = [analisis(label, kode) for label, kode in tahap]

    for label, kode in tahap:
        if kode is not None:
            print(f"== Jenis node: {label} ==")
            cetak_jenis_teratas(kode)

    for label, kode in tahap:
        cetak_anak_pertama(label, kode)

    print("== Ringkasan ==")
    for (label, _), h in zip(tahap, hasil):
        if h:
            total, baris = h
            print(f"  {label}: {baris} baris -> {total} node")

    tahap_3 = hasil[2]
    if tahap_3 and tahap_3[1] < 100:
        print("\nPeringatan: file nyata kurang dari 100 baris.")


if __name__ == "__main__":
    main()