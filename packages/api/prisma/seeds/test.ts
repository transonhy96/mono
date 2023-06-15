import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.userShare.deleteMany({});
  await prisma.userToken.deleteMany({});
  await prisma.user.deleteMany({});
  const alice = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      email: "test@test.com",
      password: "$2b$10$X8bCJRk.Tq.Q/yKkbl/XPOwPSj68w71xVSkDiwq0w/EjPwwMoUQ/y",
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: "test2@test.com" },
    update: {},
    create: {
      email: "test2@test.com",
      password: "$2b$10$X8bCJRk.Tq.Q/yKkbl/XPOwPSj68w71xVSkDiwq0w/EjPwwMoUQ/y",
    },
  });
  console.log({ alice, bob });
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
