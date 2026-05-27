import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { missions } from "../src/data"; // Membaca data.ts lu yang baru

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(
    `🤠 Memulai proses seeding ${missions.length} misi RDR2 beserta relasinya...`,
  );

  for (const mission of missions) {
    await prisma.mission.upsert({
      where: { id: mission.id },
      update: {
        title: mission.title,
        slug: mission.slug,
        chapter: `Chapter ${mission.chapter}`,
        description: mission.description,
      },
      create: {
        id: mission.id,
        slug: mission.slug,
        title: mission.title,
        chapter: `Chapter ${mission.chapter}`,
        description: mission.description,

        // 👇 LOGIKA SAKTI UNTUK MENGISI RELASI CHARACTERS
        characters: {
          connectOrCreate: mission.characters.map((char) => ({
            where: { name: char.name },
            create: { name: char.name, role: char.role },
          })),
        },

        // 👇 LOGIKA SAKTI UNTUK MENGISI RELASI LOCATIONS
        locations: {
          connectOrCreate: mission.locations.map((loc) => ({
            where: { name: loc.name },
            create: { name: loc.name, chapter: loc.chapter },
          })),
        },
      },
    });

    console.log(`⏳ Disimpan dengan relasi: ${mission.title}`);
  }

  console.log(
    "✅ Semua data misi, karakter, dan lokasi berhasil dirajut di database!",
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error("❌ Seeding Gagal:");
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
