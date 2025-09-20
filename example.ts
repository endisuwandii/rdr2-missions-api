import { missions } from "./src/data";
import { PrismaClient } from "./src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const newMission = await prisma.mission.create({
    data: {
      title: "Outlaws from the West",
      chapter: "1",
      description:
        "Arthur dan geng mencari perlindungan di pegunungan bersalju setelah perampokan yang gagal.",
    },
  });

  console.log({ newMission });

  const missions = await prisma.mission.findMany();

  console.log({ missions });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
