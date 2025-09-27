import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai proses seeding...");
  await prisma.location.deleteMany();
  await prisma.character.deleteMany();
  await prisma.mission.deleteMany();

  const missionAlpha = await prisma.mission.upsert({
    where: { title: "Misi Penyelamatan Sandera" },
    update: {},
    create: {
      chapter: "Chapter 1",
      title: "Misi Penyelamatan Sandera",
      description: "Misi untuk menyelamatkan sandera di area terlarang.",
    },
  });

  const missionBeta = await prisma.mission.upsert({
    where: { title: "Misi Pencarian Artefak Kuno" },
    update: {},
    create: {
      chapter: "Chapter 2",
      title: "Misi Pencarian Artefak Kuno",
      description: "Misi untuk menemukan artefak kuno di reruntuhan.",
    },
  });

  const char1 = await prisma.character.upsert({
    where: { name: "Arthur Morgan" },
    update: { missionId: missionAlpha.id },
    create: {
      name: "Arthur Morgan",
      role: "Pemimpin Tim",
      mission: { connect: { id: missionAlpha.id } },
    },
  });

  const char2 = await prisma.character.upsert({
    where: { name: "John Marston" },
    update: { missionId: missionAlpha.id },
    create: {
      name: "John Marston",
      role: "Ahli Taktik",
      mission: { connect: { id: missionAlpha.id } },
    },
  });

  const loc1 = await prisma.location.upsert({
    where: { name: "Gudang Terlantar" },
    update: { missionId: missionAlpha.id },
    create: {
      name: "Gudang Terlantar",
      chapter: "Chapter 1",
      mission: { connect: { id: missionAlpha.id } },
    },
  });

  const loc2 = await prisma.location.upsert({
    where: { name: "Reruntuhan Kuno" },
    update: { missionId: missionBeta.id },
    create: {
      name: "Reruntuhan Kuno",
      chapter: "Chapter 2",
      mission: { connect: { id: missionBeta.id } },
    },
  });

  console.log("Seeding selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
