const { PrismaClient } = require('@prisma/client');
(async () => {
  const prisma = new PrismaClient();
  try {
    const created = await prisma.Payment.create({
      data: {
        paymentDate: new Date(),
        amount: 100,
        status: 1,
        idOrder: null,
      },
    });
    console.log('CREATED', created);
  } catch (e) {
    console.error('ERROR', e);
  } finally {
    await prisma.$disconnect();
  }
})();
