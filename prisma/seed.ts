import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
// Tembak langsung ke node_modules biar Bun nggak rewel
import { PrismaClient } from "../node_modules/.prisma/client";
// Import data misi lu dari file data.ts
import { missions } from "../src/data";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(
    `🤠 Memulai proses seeding ${missions.length} misi RDR2 menggunakan PG Adapter...`,
  );

  // Looping data dari file data.ts
  for (const mission of missions) {
    // Menggunakan UPSERT: Aman dijalankan berkali-kali tanpa takut data dobel
    await prisma.mission.upsert({
      where: { id: mission.id },
      update: {
        title: mission.title,
        slug: mission.slug,
        chapter: `Chapter ${mission.chapter}`, // Transformasi angka jadi string "Chapter X"
        description: mission.description,
      },
      create: {
        id: mission.id,
        slug: mission.slug,
        title: mission.title,
        chapter: `Chapter ${mission.chapter}`,
        description: mission.description,
      },
    });

    console.log(`⏳ Disimpan: ${mission.title}`);
  }

  console.log(
    "✅ Semua data geng Van der Linde berhasil mendarat di database!",
  );
}

main()
  .then(async () => {
    // Putus koneksi dengan aman
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error("❌ Waduh, Seeding Gagal:");
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
