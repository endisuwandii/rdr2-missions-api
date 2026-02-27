// 1. Wajib import Pool dari library 'pg'
import { Pool } from "pg"; 
import { PrismaPg } from "@prisma/adapter-pg";
// Pastikan path ini sesuai dengan folder kamu
import { PrismaClient } from "../generated/prisma"; 

// 2. Keamanan: Cek apakah DATABASE_URL benar-benar ada di Railway/Lokal
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Tolong masukkan DATABASE_URL di environment variables!");
}

// 3. LOGIKA BENAR: Buat 'Pool' koneksi terlebih dahulu
const pool = new Pool({ connectionString });

// 4. Masukkan pool tersebut ke dalam Adapter
const adapter = new PrismaPg(pool);

// 5. Berikan adapter ke PrismaClient
const db = new PrismaClient({ adapter });

export { db };