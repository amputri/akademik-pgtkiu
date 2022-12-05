import axios from 'axios'

const url = "https://api-pgtkiu.sihaq.com/"
const urlYPS = "https://api-yps.sihaq.com/"

export const link = axios.create({
    baseURL: url
})

export const linkYPS = axios.create({
    baseURL: urlYPS
})

export const jenjang = [
    { value: "0", label: "Playgroup" },
    { value: "2", label: "TK A" },
    { value: "4", label: "TK B" }
]

export const status = [
    { value: "1", label: "Siswa" },
    { value: "2", label: "Lulus" },
    { value: "3", label: "Keluar" }
]

export const pendidikan = [
    "-",
    "Putus SD",
    "SD Sederajat",
    "SMP Sederajat",
    "SMA Sederajat",
    "D1",
    "D2",
    "D3",
    "D4/S1",
    "S2",
    "S3"
]

export const pendidikanGuru = [
    "",
    "SMA Sederajat",
    "D1",
    "D2",
    "D3",
    "D4/S1",
    "S2",
    "S3"
]

export const pekerjaan = [
    "-",
    "Nelayan",
    "Petani",
    "Peternak",
    "PNS/TNI/Polri/BUMN",
    "Karyawan Swasta",
    "Pedagang Kecil",
    "Pedagang Besar",
    "Wiraswasta",
    "Wirausaha",
    "Buruh",
    "Pensiunan"
]

export const penghasilan = [
    "Kurang dari 2.000.000",
    "2.000.000 - 4.000.000",
    "4.000.000 - 8.000.000",
    "di atas 8.000.000"
]

export const surah = [
    "An-Nas",
    "Al-Falaq",
    "Al-Ikhlash",
    "Al-Lahab",
    "Al-Nashr",
    "Al-Kafirun",
    "Al-Kautsar",
    "Al-Maun",
    "Quraisy",
    "Al-Fil",
    "Al-Humazah",
    "Al-Ashr",
    "Al-Takatsur",
    "Al-Qoriah",
    "Al-Adiyat",
    "Az-Zalzalah",
    "Al-Bayyinah",
    "Al-Qadr",
    "Al-Alaq",
    "Al-Tin",
    "Al-Insyirah",
    "Adh-Dhuha",
    "Al-Lail",
    "Asy-Syams"
]

export const jilid = [
    "Pra TK",
    "Jilid 1",
    "Jilid 2",
    "Jilid 3",
    "Jilid 4",
    "Jilid 5",
    "Jilid 6",
    "Al-Quran",
    "Ghorib",
    "Tajwid",
]

export const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
]

export const komentarCapaian = [
    "belum berkembang",
    "mulai berkembang",
    "berkembang sesuai harapan",
    "berkembang sangat baik"
]

export const nilaiHuruf = [
    "C",
    "B",
    "A",
    "A"
]

export const statusKepegawaian = [
    "GTY",
    "GTT",
    "Training"
]
