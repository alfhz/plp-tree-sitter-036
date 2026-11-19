# cek.py

CLI kecil untuk memeriksa file Python memakai tree-sitter. Yang dilaporkan:

1. Komentar yang mengandung TODO atau FIXME
2. Fungsi dengan body lebih dari 30 baris
3. File yang pohon sintaksnya mengandung error

## Pemasangan

    python -m pip install tree-sitter tree-sitter-python

## Cara menjalankan

    python cek.py <folder>

Contoh:

    python cek.py uji

## Contoh output

    uji\ada_todo.py:1: # TODO: tambahkan validasi input
    uji\fungsi_panjang.py:1: fungsi hitung_semua panjang (34 baris)
    uji\rusak.py:1: ada error sintaks

## Catatan

- Semua fungsi dihitung, termasuk method di dalam kelas dan fungsi bersarang.
- Folder venv, .venv, .git, dan node_modules dilewati.
- Hanya file berekstensi .py yang diperiksa.