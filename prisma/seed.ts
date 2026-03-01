import { PrismaClient } from "../src/generated/prisma";


const prisma = new PrismaClient({});

async function main() {
  console.log("🤠 Menjalankan Seed RDR2 (Format Slug Lowercase)...");

  await prisma.character.deleteMany();
  await prisma.location.deleteMany();
  await prisma.mission.deleteMany();

  await prisma.mission.create({
    data: {
      title: "old-friends",
      chapter: "Chapter 1",
      description:
        "Dutch leads the gang on an attack against an O'Driscoll camp.",
      characters: {
        create: [
          { name: "Dutch van der Linde", role: "Leader" },
          { name: "Arthur Morgan", role: "Enforcer" },
        ],
      },
      locations: {
        create: [{ name: "colter", chapter: "Chapter 1" }],
      },
    },
  });

  await prisma.mission.create({
    data: {
      title: "enter-pursued-by-a-memory",
      chapter: "Chapter 1",
      description:
        "Arthur and Javier go out into a blizzard to find a missing John Marston.",
      characters: {
        create: [
          { name: "Javier Escuella", role: "Scout" },
          { name: "John Marston", role: "Target" },
        ],
      },
      locations: {
        create: [{ name: "mount-hagen", chapter: "Chapter 1" }],
      },
    },
  });

  console.log("✅ Seed Berhasil!");
}

main()
  .catch((e) => {
    console.error("❌ Full Error:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });