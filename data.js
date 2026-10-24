import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_SEPATU = path.join(__dirname, "sepatu.json");
const FILE_TRANSAKSI = path.join(__dirname, "transaksi.json");

function bacaData(file) {
    const isi = fs.readFileSync(file, "utf8");
    const data = JSON.parse(isi);

    if (!Array.isArray(data)) {
        throw new Error(`Format data tidak valid: ${file}`);
    }

    return data;
}

function simpanData(file, data) {
    fs.writeFileSync(
        file,
        JSON.stringify(data, null, 2),
        "utf8"
    );
}

export function bacaSepatu() {
    return bacaData(FILE_SEPATU);
}

export function simpanSepatu(data) {
    simpanData(FILE_SEPATU, data);
}

export function bacaTransaksi() {
    return bacaData(FILE_TRANSAKSI);
}

export function simpanTransaksi(data) {
    simpanData(FILE_TRANSAKSI, data);
}