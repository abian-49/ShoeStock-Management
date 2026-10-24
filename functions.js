import {
    bacaSepatu,
    simpanSepatu,
    bacaTransaksi,
    simpanTransaksi
} from "./data.js";

// FUNGSI ID UNIK UNTUK SEPATU
function buatIdSepatu(merk, sepatu) {
    const awalanMerk = {
        nike: "NE",
        adidas: "AS",
        puma: "PA",
        asics: "AC"
    };

    const awalan = awalanMerk[merk.toLowerCase()];

    if (!awalan) {
        throw new Error("Merek tidak didukung.");
    }

    let id;

    do {
        const angka = Math.floor(1000 + Math.random() * 9000);
        id = `${awalan}${angka}`;
    } while (sepatu.some(item => item.id === id));

    return id;
}


function buatId(data) {
    return data.length > 0
        ? Math.max(...data.map(item => item.id)) + 1
        : 1;
}

function catatTransaksi(idSepatu, jenis, jumlah) {
    const transaksi = bacaTransaksi();

    transaksi.push({
        id: buatId(transaksi),
        idSepatu,
        jenis,
        jumlah,
        tanggal: new Date().toISOString()
    });

    simpanTransaksi(transaksi);
}

// READ: melihat semua sepatu
export function lihatSepatu() {
    const sepatu = bacaSepatu();

    if (sepatu.length === 0) {
        console.log("\nBelum ada data sepatu.");
        return;
    }

    console.log("\n=== DAFTAR STOK SEPATU ===");
    console.table(sepatu);
}

// CREATE: menambahkan sepatu
export async function tambahSepatu(rl) {
    const sepatu = bacaSepatu();

    const nama = (
        await rl.question("Nama sepatu: ")
    ).trim();

    const ukuran = Number(
        await rl.question("Ukuran sepatu: ")
    );

    const harga = Number(
        await rl.question("Harga sepatu: ")
    );

    const stok = Number(
        await rl.question("Stok awal: ")
    );

    if (
        !nama ||
        !Number.isInteger(ukuran) ||
        ukuran <= 0 ||
        !Number.isFinite(harga) ||
        harga <= 0 ||
        !Number.isInteger(stok) ||
        stok < 0
    ) {
        console.log("Data tidak valid.");
        return;
    }

    const merk = (
    await rl.question("Merek sepatu (Nike/Adidas/Puma/ASICS): ")
    ).trim();

    let id;

    try {
    id = buatIdSepatu(merk, sepatu);
    }    catch (error) {
    console.log(error.message);
    return;
    }

    sepatu.push({ id, merk, nama, ukuran, harga, stok });
    simpanSepatu(sepatu);

    if (stok > 0) {
        catatTransaksi(id, "STOK AWAL", stok);
    }

    console.log("Sepatu berhasil ditambahkan.");
}

// UPDATE: mengubah data sepatu
export async function ubahSepatu(rl) {
    const sepatu = bacaSepatu();

    const id = (
    await rl.question("Masukkan ID sepatu: ")
    ).trim().toUpperCase();

    const item = sepatu.find(s => s.id === id);

    if (!item) {
        console.log("Sepatu tidak ditemukan.");
        return;
    }

    console.log("Kosongkan input jika tidak ingin mengubah nilainya.");

    const namaInput = (
        await rl.question(`Nama [${item.nama}]: `)
    ).trim();

    const ukuranInput = (
        await rl.question(`Ukuran [${item.ukuran}]: `)
    ).trim();

    const hargaInput = (
        await rl.question(`Harga [${item.harga}]: `)
    ).trim();

    const nama = namaInput || item.nama;
    const ukuran = ukuranInput === ""
        ? item.ukuran
        : Number(ukuranInput);
    const harga = hargaInput === ""
        ? item.harga
        : Number(hargaInput);

    if (
        !nama ||
        !Number.isInteger(ukuran) ||
        ukuran <= 0 ||
        !Number.isFinite(harga) ||
        harga <= 0
    ) {
        console.log("Data tidak valid.");
        return;
    }

    item.nama = nama;
    item.ukuran = ukuran;
    item.harga = harga;

    simpanSepatu(sepatu);
    console.log("Data sepatu berhasil diubah.");
}

// DELETE: menghapus sepatu
export async function hapusSepatu(rl) {
    const sepatu = bacaSepatu();

    const id = (
    await rl.question("Masukkan ID sepatu: ")
    ).trim().toUpperCase();

    const item = sepatu.find(s => s.id === id);

    if (!item) {
        console.log("Sepatu tidak ditemukan.");
        return;
    }

    const konfirmasi = (
        await rl.question("Yakin hapus? (y/n): ")
    ).trim().toLowerCase();

    if (konfirmasi !== "y") {
        console.log("Penghapusan dibatalkan.");
        return;
    }

    simpanSepatu(sepatu.filter(s => s.id !== id));
    console.log("Sepatu berhasil dihapus.");
}

// STOK MASUK dan STOK KELUAR
export async function ubahStok(rl, jenis) {
    const sepatu = bacaSepatu();

    const id = (
        await rl.question("Masukkan ID sepatu: ")
    ).trim().toUpperCase();

    const item = sepatu.find(s => s.id === id);

    if (!item) {
        console.log("Sepatu tidak ditemukan.");
        return;
    }

    const jumlah = Number(
        await rl.question("Jumlah sepatu: ")
    );

    if (!Number.isInteger(jumlah) || jumlah <= 0) {
        console.log("Jumlah harus berupa bilangan bulat positif.");
        return;
    }

    if (jenis === "STOK KELUAR" && jumlah > item.stok) {
        console.log("Stok tidak mencukupi.");
        return;
    }

    if (jenis === "STOK MASUK") {
        item.stok += jumlah;
    } else {
        item.stok -= jumlah;
    }

    simpanSepatu(sepatu);
    catatTransaksi(id, jenis, jumlah);

    console.log(`${jenis} berhasil dicatat.`);
    console.log(`Stok terbaru ${item.nama}: ${item.stok}`);
}

// READ: melihat riwayat transaksi
export function riwayatTransaksi() {
    const transaksi = bacaTransaksi();

    if (transaksi.length === 0) {
        console.log("\nBelum ada riwayat transaksi.");
        return;
    }

    const sepatu = bacaSepatu();

    const hasil = transaksi.map(t => ({
        ID: t.id,
        Sepatu: sepatu.find(s => s.id === t.idSepatu)?.nama
            ?? `ID ${t.idSepatu} (data dihapus)`,
        Jenis: t.jenis,
        Jumlah: t.jumlah,
        Tanggal: t.tanggal
    }));

    console.log("\n=== RIWAYAT TRANSAKSI ===");
    console.table(hasil);
}