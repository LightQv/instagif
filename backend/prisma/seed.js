const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const { users, posts, likes, feelings } = require("./data");

async function main() {
  await prisma.user.createMany({
    data: users,
  });
  await prisma.post.createMany({
    data: posts,
  });
  await prisma.like.createMany({
    data: likes,
  });
  await prisma.feeling.createMany({
    data: feelings,
  });
}

main()
  .catch((e) => {
    console.warn(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
