# Draf Proposal Proyek: Daftar Endpoint API FastAPI dengan Tree-sitter

**Nama:** Alifah Zachra Syifatunnajwa | **NIM:** 251524036 | **Kelas:** 2B-D4 | **Mata kuliah:** Programming Language Pragmatics

## 1. Judul

Pembuat Daftar Endpoint API dari Kode FastAPI dengan Tree-sitter

## 2. Masalah

Di aplikasi web enterprise, jumlah endpoint cepat bertambah dan tersebar di banyak file route. Daftar endpoint di dokumentasi sering ketinggalan, jadi developer baru, tim frontend, dan QA harus membuka file satu per satu untuk tahu endpoint apa saja yang ada. Kegiatan yang dibantu: dokumentasi API dan code review.

## 3. Kenapa tidak cukup dengan AI saja

Kalau AI diminta membaca repo lalu menulis daftar endpoint, hasilnya bisa berbeda tiap dijalankan, bisa ada endpoint yang terlewat di repo besar, dan memakan token setiap kali. Tool berbasis tree-sitter selalu memberi hasil yang sama untuk kode yang sama, hampir tanpa biaya, dan bisa jalan otomatis di CI tiap commit. Regex juga kurang tepat: decorator bisa ditulis beberapa baris, contoh `@app.get(...)` bisa muncul di komentar atau docstring, dan tidak semua decorator adalah route. Tree-sitter membaca struktur `decorated_definition`, jadi yang cocok hanya decorator route yang benar-benar menempel pada sebuah fungsi.

## 4. Bahasa dan framework target

Python dengan FastAPI. Grammar: `tree-sitter-python` (tersedia di PyPI, sudah dipakai di Tugas 1-6).

## 5. Contoh kode

```python
@app.get("/users/{user_id}")   # harus terdeteksi
def ambil_user(user_id): ...

@router.post("/items")         # harus terdeteksi
async def buat_item(item): ...

@app.on_event("startup")       # tidak boleh (bukan route HTTP)
def mulai(): ...

# @app.get("/lama")            # tidak boleh (komentar)
```

## 6. Rancangan query

Aturan 1: ambil method, path, dan nama fungsi dari decorator route.

```scheme
(decorated_definition
  (decorator
    (call
      function: (attribute
        object: (identifier) @objek
        attribute: (identifier) @metode)
      arguments: (argument_list . (string) @path)))
  definition: (function_definition name: (identifier) @nama_fungsi)
  (#match? @metode "^(get|post|put|delete|patch)$"))
```

Aturan 2: endpoint yang body-nya tidak diawali docstring ditandai "belum didokumentasikan".

## 7. Bentuk output

Tabel di terminal (method, path, nama fungsi, file:baris), dan file JSON. Opsi `--md` menghasilkan tabel Markdown yang bisa langsung ditempel ke dokumentasi API.

## 8. Cara evaluasi

Uji pada file contoh buatan sendiri, lalu pada satu repo FastAPI open source yang kecil. Ambil 20 temuan, cek manual satu per satu di kodenya, dan hitung berapa yang benar. Endpoint yang terlewat dicek kasar dengan `Select-String` pada pola `@xxx.get(`, `@xxx.post(`, dan sejenisnya, lalu dibandingkan dengan hasil tool.

## 9. Rencana kerja dan risiko

- Minggu 1: finalisasi topik, query endpoint jalan di file contoh.
- Minggu 2: ambil method, path, dan nama fungsi, simpan ke JSON.
- Minggu 3: aturan docstring, plus kasus sulit (`async def`, decorator beberapa baris).
- Minggu 4: uji di repo nyata dan cek manual 20 temuan.
- Minggu 5: output Markdown, README, dan laporan.

Risiko: prefix dari `APIRouter(prefix=...)` tidak otomatis digabung ke path, route yang didaftarkan lewat `add_api_route(...)` tidak terdeteksi, dan path yang bukan string literal (misalnya `@app.get(PATH)`) dilewati. Ketiganya dicatat sebagai batas tool, bukan dipaksa diselesaikan.
