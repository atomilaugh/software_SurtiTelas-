const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('MODEL FIELDS:', prisma._dmmf.modelMap.Products.fields.map(f => ({ name: f.name, dbName: f.dbName, type: f.type })));
    const count = await prisma.Products.count();
    console.log('COUNT:', count);
  } catch (err) {
    console.error('ERROR', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
