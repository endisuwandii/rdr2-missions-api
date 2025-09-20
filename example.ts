import { missions } from "./src/data";
import { PrismaClient } from "./src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const newMision = await prisma.missions.create({
    data: { title: "Outlaws from the West" },
  });

  console.log({ newMision });

  const missions = await prisma.missions.findMany();

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
