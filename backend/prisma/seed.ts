import { PrismaClient } from "@prisma/client";
import drivers from "./dataMock";

const prisma = new PrismaClient();

async function seed() {
  await prisma.driver.createMany({
    data: drivers,
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
