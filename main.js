import readline from "node:readline/promises";
import {
    lihatSepatu,
    tambahSepatu,
    ubahSepatu,
    hapusSepatu,
    ubahStok,
    riwayatTransaksi
} from "./functions.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    let berjalan = true;

    console.log("\n=== SHOESTOCK MANAGEMENT ===");

    while (berjalan) {
        console.log(`
1. Lihat Data Sepatu
2. Tambah Sepatu
3. Ubah Data Sepatu
4. Hapus Sepatu
5. Stok Masuk
6. Stok Keluar
7. Riwayat Transaksi
0. Keluar
`);

        const pilihan = (
            await rl.question("Pilih menu: ")
        ).trim();

        try {
            switch (pilihan) {
                case "1":
                    lihatSepatu();
                    break;

                case "2":
                    await tambahSepatu(rl);
                    break;

                case "3":
                    await ubahSepatu(rl);
                    break;

                case "4":
                    await hapusSepatu(rl);
                    break;

                case "5":
                    await ubahStok(rl, "STOK MASUK");
                    break;

                case "6":
                    await ubahStok(rl, "STOK KELUAR");
                    break;

                case "7":
                    riwayatTransaksi();
                    break;

                case "0":
                    berjalan = false;
                    console.log("Terima kasih. Semoga Harimu Menyenangkan!");
                    break;

                default:
                    console.log("Pilihan tidak valid.");
            }
        } catch (error) {
            console.error("Terjadi kesalahan:", error.message);
        }
    }

    rl.close();
}

main().catch(error => {
    console.error("Program gagal dijalankan:", error.message);
    rl.close();
});