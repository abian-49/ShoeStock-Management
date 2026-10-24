# Gudang Sepatu (ShoeStock Management)

## Pengenalan
Gudang Sepatu (ShoeStock Management) adalah aplikasi manajemen stok sepatu berbasis terminal (CLI) yang dibuat dengan Node.js. Aplikasi ini dirancang untuk membantu pemilik toko atau pengelola gudang kecil mencatat barang secara rapi tanpa harus memakai spreadsheet atau database yang rumit.

Lewat satu menu interaktif di terminal, pengguna dapat melihat daftar sepatu, menambah sepatu baru, mengubah data, menghapus data, mencatat stok masuk dan stok keluar, serta melihat riwayat transaksi. Setiap perubahan stok otomatis dicatat lengkap dengan jenis transaksi, jumlah, dan waktunya, sehingga pergerakan barang mudah dilacak.

**Fitur utama**
- Operasi CRUD data sepatu (nama, merek, ukuran, harga, stok)
- Pencatatan stok awal, stok masuk, dan stok keluar
- Validasi input, misalnya stok tidak boleh minus dan harga harus lebih dari 0
- Riwayat transaksi yang tersimpan permanen
- Penyimpanan data di file JSON, jadi tidak perlu memasang database

**ID otomatis per merek**

ID sepatu dibuat otomatis dari awalan merek diikuti 4 angka acak yang dijamin unik, contoh `NE4821`.

| Merek  | Awalan |
|--------|--------|
| Nike   | NE     |
| Adidas | AS     |
| Puma   | PA     |
| ASICS  | AC     |

**Teknologi yang digunakan**: Node.js (ES Module), modul `readline`, dan penyimpanan file JSON.

## Instalasi
1. Pasang [Node.js](https://nodejs.org/) (versi 18+).
2. Buka folder project di terminal.
3. Pastikan `package.json` memuat `"type": "module"` dan script `"start": "node main.js"`.
4. Pastikan `sepatu.json` dan `transaksi.json` berisi minimal `[]`.

## Penggunaan
```bash
npm start
```

Ketik nomor menu lalu tekan Enter:

| Menu | Fungsi | Input yang diminta |
|------|--------|--------------------|
| 1 | Lihat Data Sepatu | - |
| 2 | Tambah Sepatu | Nama, ukuran, harga, stok awal, merek (Nike/Adidas/Puma/ASICS) |
| 3 | Ubah Data Sepatu | ID, lalu nama/ukuran/harga baru (kosongkan jika tidak diubah) |
| 4 | Hapus Sepatu | ID, lalu konfirmasi `y`/`n` |
| 5 | Stok Masuk | ID dan jumlah |
| 6 | Stok Keluar | ID dan jumlah (tidak boleh melebihi stok) |
| 7 | Riwayat Transaksi | - |
| 0 | Keluar | - |

Ukuran, stok, dan jumlah harus bilangan bulat; harga harus lebih dari 0. ID tidak membedakan huruf besar/kecil.

## Struktur Direktori
```
project_shoes_store/
├── main.js          # menu utama
├── functions.js     # fungsi CRUD, stok, riwayat
├── data.js          # baca/simpan file JSON
├── sepatu.json      # data sepatu
├── transaksi.json   # riwayat transaksi
├── package.json
└── README.md
```

## Pemecahan Masalah
| Error | Solusi |
|-------|--------|
| `running scripts is disabled` (PowerShell) | Jalankan `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`, lalu buka terminal baru |
| `ERR_MODULE_NOT_FOUND` | Cek nama dan lokasi file yang di-import (huruf besar/kecil berpengaruh) |
| `Identifier '...' has already been declared` | Ada import atau deklarasi ganda di file tersebut; hapus salah satu |
| Warning `MODULE_TYPELESS_PACKAGE_JSON` | Tambahkan `"type": "module"` di `package.json` |
| `Sepatu tidak ditemukan` | Jangan pakai `Number()` untuk ID bermerek; kosongkan `sepatu.json` jadi `[]` jika masih berisi ID angka lama |