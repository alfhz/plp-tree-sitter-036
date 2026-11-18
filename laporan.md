# Laporan Tugas Awal Tree-sitter

**Nama:** Alifah Zachra Syifatunnajwa
**NIM:** 251524036
**Kelas:** 2B-D4
**Mata kuliah:** Programming Language Pragmatics

## Setup

**Lingkungan:** Windows, PowerShell, VS Code, Python 3.12.10, Node v24.18.0, tree-sitter-cli 0.27.2

**Kendala dan cara mengatasi:** script PowerShell diblokir (execution policy), diatasi dengan `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

![Hasil tree-sitter --version dan tes.py](laporan/screenshot/setup.png)

## Tugas 1: Membaca pohon

**Hasil:**

![Tebakan pohon vs hasil asli](laporan/screenshot/t1-pohon.png)
![Node ERROR/MISSING](laporan/screenshot/t1-error.png)

**Penjelasan singkat:** Pada tugas ini saya memakai tree-sitter untuk mem-parse tiga potongan kode Python, yaitu `fungsi`, `if_else`, dan `kelas`, lalu mencetak struktur tree-nya. Dari penelusuran anak node, saya menemukan beberapa node anonim, yaitu `def` dan `return` pada potongan `fungsi`, serta `if` dan `:` pada potongan `if_else`. Perbedaan `children` dan `named_children` adalah `children` mengambil semua anak node, termasuk yang anonim, sedangkan `named_children` hanya mengambil anak yang bernama. Pada potongan `fungsi`, `children` berisi 5 node (`def`, `identifier`, `parameters`, `return`, `expression_statement`), sedangkan `named_children` hanya berisi 3 node (`identifier`, `parameters`, `expression_statement`).

**Kendala dan solusi:** Kendala pada memperkirakan hasil pohon. Solusinya dengan memahami pada playground tree sitter.

## Tugas 2: Penjelajah node

**Hasil:**

![Output jelajah.py pada file 100+ baris](laporan/screenshot/t2-jelajah.png)

**Penjelasan singkat:** [2-3 kalimat. Cara rekursi jalan dan cara nama field diambil.]

**Kendala dan solusi:** [Isi, atau tulis "tidak ada"]

## Tugas 3: Query pertama

**Hasil:**

![Tiga query dan hitungan manual](laporan/screenshot/t3-query.png)

**Penjelasan singkat:** [2-3 kalimat. Pola query yang dipakai dan kenapa hasilnya cocok dengan hitungan manual.]

**Kendala dan solusi:** [Isi, atau tulis "tidak ada"]

## Tugas 4: Grammar DSL filter

**Hasil:**

![tree-sitter test lulus](laporan/screenshot/t4-test.png)
![Pesan conflict di langkah 4c](laporan/screenshot/t4-conflict.png)

**Penjelasan singkat:** [2-3 kalimat. Fitur yang ditambah bertahap, kenapa `and` lebih kuat dari `or`, serta tes `in` dan `contains`.]

**Kendala dan solusi:** [Isi, atau tulis "tidak ada"]

## Tugas 5: Highlight

**Hasil:**

![Hasil tree-sitter highlight](laporan/screenshot/t5-highlight.png)

**Penjelasan singkat:** [2-3 kalimat. Capture apa saja yang dibuat dan untuk token mana.]

**Kendala dan solusi:** [Isi, atau tulis "tidak ada"]

## Tugas 6: cek.py

**Hasil:**

![Output cek.py di folder uji dan repo nyata](laporan/screenshot/t6-cek.png)

**Penjelasan singkat:** [2-3 kalimat. Tiga fitur yang dibuat, repo yang dipakai untuk uji, dan hasil cek manual 2 file acak.]

**Kendala dan solusi:** [Isi, atau tulis "tidak ada"]

## Catatan penggunaan AI

Isi hanya untuk tugas yang dibantu AI. Kesalahan AI harus benar-benar kamu temukan sendiri, lengkap dengan buktinya.

| Tugas       | Yang diminta ke AI | Kesalahan atau kekurangan hasil AI | Cara membuktikan                  |
| ----------- | ------------------ | ---------------------------------- | --------------------------------- |
| [Tugas ke-] | [isi]              | [isi]                              | [kasus uji / output / cek manual] |
| [Tugas ke-] | [isi]              | [isi]                              | [isi]                             |
| [Tugas ke-] | [isi]              | [isi]                              | [isi]                             |
