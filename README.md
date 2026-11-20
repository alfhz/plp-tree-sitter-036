# PLP Tree-sitter

Tugas awal Tree-sitter untuk mata kuliah Programming Language Pragmatics.

**Nama:** Alifah Zachra Syifatunnajwa | **NIM:** 251524036 | **Kelas:** 2B-D4

## Tentang proyek

Tree-sitter adalah parser yang mengubah kode menjadi pohon sintaks (syntax tree). Dari pohon itu, struktur kode seperti fungsi, parameter, atau pemanggilan fungsi bisa dibaca dan dicari berdasarkan strukturnya, bukan sekadar dicocokkan sebagai teks seperti pada regex. Tree-sitter juga tetap menghasilkan pohon walau kodenya belum valid, dengan menandai bagian yang rusak sebagai node `ERROR` atau `MISSING`.

Repo ini berisi tugas awal untuk mengenal Tree-sitter secara bertahap: membaca pohon, menelusurinya lewat kode Python, mencari pola dengan query, membuat grammar sendiri, lalu menggabungkan semuanya menjadi tool kecil.

### Istilah yang dipakai

- **Syntax tree:** pohon yang menggambarkan struktur kode, hasil parse dari Tree-sitter.
- **Node bernama dan anonim:** node bernama mewakili konstruksi bahasa (misalnya `function_definition`), sedangkan node anonim adalah token seperti `def` atau `:`.
- **Field:** nama untuk anak tertentu di sebuah node, misalnya `name:` dan `parameters:` pada fungsi.
- **Query (`.scm`):** pola berbentuk S-expression untuk mencari bagian tertentu di pohon, dengan penanda `@nama` untuk node yang ingin diambil.
- **Grammar (`grammar.js`):** aturan yang mendefinisikan sebuah bahasa, dipakai Tree-sitter untuk membuat parser.

## Gambaran tiap tugas

| Tugas | Yang dikerjakan |
| --- | --- |
| 1. Membaca pohon | Mem-parse tiga potongan kode Python (fungsi, if/else, kelas), membandingkan pohon hasilnya dengan tebakan, lalu mencari node anonim dan node `ERROR` atau `MISSING` |
| 2. Penjelajah node | Program rekursif yang mencetak setiap node bernama dengan indentasi sesuai kedalaman, lengkap dengan tipe, posisi, dan nama field |
| 3. Query pertama | Tiga query `.scm`: nama fungsi beserta jumlah parameternya, pemanggilan `print`, dan `import`, lalu hasilnya dicocokkan dengan hitungan manual |
| 4. Grammar DSL filter | Bahasa kecil untuk kotak pencarian, contohnya `status = "open" and (priority > 2 or owner = "budi")`, dibangun bertahap (operator, and, or, kurung, not, in, contains) dan diuji lewat `test/corpus/` |
| 5. Highlight | File `highlights.scm` agar tiap jenis token di bahasa filter (kata kunci, operator, string, angka, boolean, nama field) tampil dengan warna berbeda |
| 6. cek.py | CLI yang melaporkan komentar TODO atau FIXME, fungsi yang lebih dari 30 baris, dan file yang punya error sintaks |

## Isi repositori

| Folder / file | Isi |
| --- | --- |
| `tugas1-3/` | Tugas 1-3: parse dan baca pohon (`t1.py`), penjelajah node (`jelajah.py`), query `.scm` beserta penjalannya (`q.py`, `q_match.py`), dan output-nya dalam `.txt` |
| `tree-sitter-filter/` | Tugas 4-5: grammar DSL filter (`grammar.js`), kasus uji di `test/corpus/`, dan highlight di `queries/highlights.scm` |
| `cek/` | Tugas 6: `cek.py`, pemeriksa file Python (punya `README.md` sendiri) |
| `laporan.md`, `laporan.pdf`, `laporan/screenshot/` | Laporan, termasuk catatan penggunaan AI, dan screenshot hasil |
| `proposal-draf.md`, `proposal-draf.pdf` | Draf proposal proyek: pembuat daftar endpoint API FastAPI |

## Persiapan

Dikerjakan di Windows dengan PowerShell. Yang dibutuhkan:

- Python 3.10 atau lebih baru (dipakai 3.12)
- Node.js
- tree-sitter-cli
- Compiler C (Visual Studio Build Tools, workload Desktop development with C++), dipakai di Tugas 4 dan 5

```powershell
npm install -g tree-sitter-cli
python -m pip install tree-sitter tree-sitter-python tree-sitter-javascript
$env:PYTHONUTF8 = "1"
tree-sitter --version
```

Kalau `tree-sitter` diblokir PowerShell karena execution policy:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

## Cara menjalankan

### Tugas 1-3 (folder `tugas1-3`)

```powershell
cd tugas1-3
python t1.py                           # parse potongan kode, cetak pohon
python jelajah.py kecil.py             # cetak node bernama dengan indentasi
python q.py contoh.py print.scm        # jalankan query dari file .scm
python q_match.py contoh.py fungsi.scm # query fungsi dan jumlah parameternya
```

### Tugas 4 (folder `tree-sitter-filter`)

```powershell
cd tree-sitter-filter
tree-sitter generate                   # buat parser dari grammar.js
tree-sitter parse contoh.filter        # cetak pohon untuk satu ekspresi filter
tree-sitter test                       # jalankan kasus uji di test/corpus/
```

`contoh.filter` hanya boleh berisi satu ekspresi. Kalau berisi beberapa baris, hasilnya `ERROR`.

### Tugas 5 (folder `tree-sitter-filter`)

Sekali saja, buat file konfigurasi CLI:

```powershell
tree-sitter init-config
```

Buka file config yang disebutkan, lalu isi `parser-directories` dengan folder induk dari `tree-sitter-filter`, yaitu folder repo ini (pakai garis miring `/`). Setelah itu:

```powershell
tree-sitter highlight contoh.filter
```

### Tugas 6 (folder `cek`)

```powershell
cd cek
python cek.py uji                      # periksa semua file .py di folder uji
```

Penjelasan lengkap ada di `cek/README.md`.
