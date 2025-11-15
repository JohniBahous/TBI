const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const data = require('../data/adminData.json');

async function main() {

  for (const admin of data) {
    await prisma.admin.create({
      data: {
        ...admin,
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
  