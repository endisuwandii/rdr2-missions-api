RDR2 Missions API

Selamat datang di RDR2 Missions API! Proyek ini adalah REST API sederhana yang dibuat menggunakan Hono dan Bun untuk menyajikan data misi dari game populer, Red Dead Redemption 2.

Proyek ini dibangun sebagai bagian dari pembelajaran backend untuk mendemonstrasikan prinsip-prinsip dasar API, routing, dan penanganan data.

Fitur

    RESTful API: Menggunakan metode HTTP standar (GET) untuk mengakses data misi.

    Data Palsu (Mock Data): Menyajikan data dari array JavaScript, tanpa memerlukan database.

    Cepat & Ringan: Dibuat dengan Hono, framework web minimalis yang sangat cepat, dan Bun, runtime JavaScript yang modern.

Persyaratan

Pastikan Anda telah menginstal Bun di komputer Anda. Anda dapat mengunduhnya dari Bun.sh.

Cara Menjalankan Proyek

Ikuti langkah-langkah sederhana ini untuk menjalankan API di lingkungan lokal Anda.

    Kloning repositori ini:
    Bash

git clone https://github.com/nama-pengguna-anda/rdr2-missions-api.git
cd rdr2-missions-api

Instal dependensi:
Bash

bun install

Jalankan server pengembangan:
Bash

    bun run dev

Server akan berjalan di http://localhost:3000.

Endpoints API

API ini menyediakan dua endpoint utama untuk mengakses data misi. Anda bisa mengujinya menggunakan browser atau API client seperti Hoppscotch atau Postman.

GET /missions

Mengambil daftar semua misi yang tersedia.

Contoh Respons:

JSON

[
{
"id": 1,
"chapter": 1,
"title": "Outlaws from the West",
"description": "Arthur dan geng mencari perlindungan di pegunungan bersalju setelah perampokan yang gagal."
},
{
"id": 2,
"chapter": 1,
"title": "Enter, Pursued by a Memory",
"description": "Arthur dan Javier mencari John Marston yang hilang di tengah badai salju."
}
]

GET /missions/:id

Mengambil detail satu misi berdasarkan ID. Ganti :id dengan ID misi yang Anda inginkan (misalnya, 1, 2, dst.).

Contoh Respons:

GET /missions/1
JSON

{
"id": 1,
"chapter": 1,
"title": "Outlaws from the West",
"description": "Arthur dan geng mencari perlindungan di pegunungan bersalju setelah perampokan yang gagal."
}

Respons Jika Misi Tidak Ditemukan (Status 404):

GET /missions/999
JSON

{
"message": "Misi tidak ditemukan"
}

Kontribusi

Proyek ini terbuka untuk kontribusi! Jika Anda ingin menambahkan misi lain atau meningkatkan kode, silakan buka issue atau kirimkan pull request.
