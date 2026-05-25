require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function run() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
      console.error('Falta ADMIN_EMAIL o ADMIN_PASSWORD en .env');
      process.exit(1);
    }
    const hashed = bcrypt.hashSync(adminPassword, 10);
    const existing = await prisma.Users.findUnique({ where: { email: adminEmail } });
    if (existing) {
      await prisma.Users.update({ where: { email: adminEmail }, data: { password: hashed } });
      console.log('Password del admin actualizada para', adminEmail);
    } else {
      await prisma.Users.create({ data: { email: adminEmail, password: hashed, role: 'admin', name: 'Administrador' } });
      console.log('Admin creado:', adminEmail);
    }
    process.exit(0);
  } catch (err) {
    console.error('Error actualizando admin:', err);
    process.exit(1);
  }
}

run();