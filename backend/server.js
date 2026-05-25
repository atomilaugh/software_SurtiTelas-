const express = require("express");
const cors = require("cors");
const path = require("path");
require('dotenv').config();

const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient({});

const app = express();

app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
const frontendDistPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendDistPath));

async function seedProducts() {
  const count = await prisma.Products.count();
  if (count > 0) return;

  console.log('Seed inicial de productos en SQLite');
  const data = [
    {
      name: 'Algodón premium',
      price: 12.5,
      description: 'Tela de algodón suave y transpirable',
      tipo: 'Natural',
      color: 'Blanco',
      stock: 120,
    },
    {
      name: 'Poliéster stretch',
      price: 15.0,
      description: 'Tela sintética elástica para prendas deportivas',
      tipo: 'Sintético',
      color: 'Azul',
      stock: 75,
    },
    {
      name: 'Lino fresco',
      price: 18.0,
      description: 'Tela fresca ideal para ropa de verano',
      tipo: 'Natural',
      color: 'Beige',
      stock: 40,
    },
  ];

  for (const item of data) {
    await prisma.Products.create({ data: item });
  }
}

// Seed administrador
async function seedAdminUser() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@surtitelas.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  try {
    const existing = await prisma.Users.findUnique({ where: { email: adminEmail } });
    if (existing) return;
    const hashed = bcrypt.hashSync(adminPassword, 10);
    await prisma.Users.create({ data: { email: adminEmail, password: hashed, role: 'admin', name: 'Administrador' } });
    console.log('Admin seed creado:', adminEmail);
  } catch (err) {
    console.error('Error creando admin seed:', err);
  }
}

async function seedSampleUsers() {
  const sampleUsers = [
    { email: 'asesor@surtitelas.com', password: 'surtitelas1015072143', role: 'asesor', name: 'Asesor Comercial' },
    { email: 'domiciliario@surtitelas.com', password: 'surtitelas1015072143', role: 'domiciliario', name: 'Domiciliario Express' },
    { email: 'cliente@surtitelas.com', password: 'surtitelas1015072143', role: 'cliente', name: 'Cliente VIP' },
  ];

  for (const sample of sampleUsers) {
    try {
      const existing = await prisma.Users.findUnique({ where: { email: sample.email } });
      if (existing) continue;
      const hashed = bcrypt.hashSync(sample.password, 10);
      await prisma.Users.create({ data: { email: sample.email, password: hashed, role: sample.role, name: sample.name, status: 'activo' } });
      console.log('Usuario seed creado:', sample.email);
    } catch (err) {
      console.error('Error creando usuario seed:', err);
    }
  }
}

async function seedSampleOrders() {
  const count = await prisma.Orders.count();
  if (count > 0) return;

  try {
    const client = await prisma.Users.findUnique({ where: { email: 'cliente@surtitelas.com' } });
    const advisor = await prisma.Users.findUnique({ where: { email: 'asesor@surtitelas.com' } });
    const deliveryPerson = await prisma.Users.findUnique({ where: { email: 'domiciliario@surtitelas.com' } });
    const products = await prisma.Products.findMany();
    if (!client || !products.length) return;

    const address = await prisma.Address.create({
      data: {
        label: 'Casa Cliente VIP',
        street: 'Calle Principal 123',
        city: 'Medellín',
        state: 'Antioquia',
        zipCode: '050001',
        country: 'Colombia',
        phone: '+57 300 1234567',
        userId: client.id_user,
      },
    });

    await prisma.Orders.create({
      data: {
        orderNumber: 'PED-001',
        clientId: client.id_user,
        advisorId: advisor?.id_user || undefined,
        deliveryPersonId: deliveryPerson?.id_user || undefined,
        deliveryAddressId: address.id_address,
        status: 'en proceso',
        paymentMethod: 'Tarjeta',
        total: 15000,
        note: 'Pedido listo para entrega',
        items: {
          create: [
            { productId: products[0].id_product, quantity: 5, unitPrice: 2500, total: 12500 },
            { productId: products[1].id_product, quantity: 1, unitPrice: 2500, total: 2500 },
          ],
        },
        payment: {
          create: {
            status: 'pagado',
            amount: 15000,
            method: 'Tarjeta de crédito',
            reference: 'TRANS-001',
            proofUrl: null,
            comment: 'Pago aprobado',
          },
        },
        delivery: {
          create: {
            status: 'pendiente',
            pickupAt: new Date(),
            note: 'Entrega express',
          },
        },
      },
    });

    await prisma.Orders.create({
      data: {
        orderNumber: 'PED-002',
        clientId: client.id_user,
        advisorId: advisor?.id_user || undefined,
        deliveryPersonId: deliveryPerson?.id_user || undefined,
        deliveryAddressId: address.id_address,
        status: 'completado',
        paymentMethod: 'Efectivo',
        total: 23500,
        note: 'Pedido directo al cliente',
        items: {
          create: [
            { productId: products[2].id_product, quantity: 2, unitPrice: 7500, total: 15000 },
            { productId: products[0].id_product, quantity: 4, unitPrice: 2125, total: 8500 },
          ],
        },
        payment: {
          create: {
            status: 'pagado',
            amount: 23500,
            method: 'Efectivo',
            reference: 'TRANS-002',
            proofUrl: null,
            comment: 'Recibido en efectivo',
          },
        },
        delivery: {
          create: {
            status: 'entregado',
            pickupAt: new Date(Date.now() - 2 * 86400000),
            deliveredAt: new Date(Date.now() - 1 * 86400000),
            note: 'Entregado en dirección principal',
          },
        },
      },
    });

    console.log('Ordenes de ejemplo seed creadas');
  } catch (err) {
    console.error('Error creando ordenes seed:', err);
  }
}

function generateToken(user) {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  return jwt.sign({ id: user.id_user, email: user.email, role: user.role }, secret, { expiresIn: '7d' });
}

function requireAdmin(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ error: 'No autorizado' });
  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'No autorizado' });
  const token = parts[1];
  try {
    const secret = process.env.JWT_SECRET || 'dev-secret';
    const decoded = jwt.verify(token, secret);
    if (decoded.role !== 'admin') return res.status(403).json({ error: 'Acceso restringido' });
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

// Rutas de API
app.get("/api/products", async (req, res) => {
  try {
    const products = await prisma.Products.findMany({
      include: { category: true },
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// GET product by id
app.get('/api/products/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const product = await prisma.Products.findUnique({
      where: { id_product: id },
      include: { category: true },
    });
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching product' });
  }
});

// POST create product
app.post('/api/products', requireAdmin, async (req, res) => {
  const { name, price, description, tipo, color, stock, id_product_category } = req.body;
  try {
    const data = {
      name,
      price: price || 0,
      description,
      tipo,
      color,
      stock: stock || 0,
    };
    if (id_product_category !== undefined && id_product_category !== null) {
      data.category = { connect: { id_product_category: id_product_category } };
    }
    const created = await prisma.Products.create({ data });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating product' });
  }
});

// PUT update product
app.put('/api/products/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, price, description, tipo, color, stock, id_product_category } = req.body;
  try {
    const data = { name, price, description, tipo, color, stock };
    if (id_product_category !== undefined) {
      data.category = id_product_category === null
        ? { disconnect: true }
        : { connect: { id_product_category } };
    }
    const updated = await prisma.Products.update({
      where: { id_product: id },
      data,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating product' });
  }
});

// DELETE product
app.delete('/api/products/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.Products.delete({ where: { id_product: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting product' });
  }
});

app.get('/api/orders', requireAdmin, async (req, res) => {
  try {
    const orders = await prisma.Orders.findMany({
      include: {
        client: true,
        advisor: true,
        deliveryPerson: true,
        items: { include: { product: true } },
        payment: true,
        delivery: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders', err);
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

app.get('/api/orders/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const order = await prisma.Orders.findUnique({
      where: { id_order: id },
      include: {
        client: true,
        advisor: true,
        deliveryPerson: true,
        items: { include: { product: true } },
        payment: true,
        delivery: true,
      },
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    console.error('Error fetching order', err);
    res.status(500).json({ error: 'Error fetching order' });
  }
});

app.post('/api/orders', requireAdmin, async (req, res) => {
  const { orderNumber, clientId, advisorId, deliveryPersonId, deliveryAddressId, paymentMethod, note, items } = req.body;
  if (!orderNumber || !clientId || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'orderNumber, clientId y items son requeridos' });
  }

  try {
    const total = items.reduce((sum, item) => sum + (Number(item.unitPrice) * Number(item.quantity)), 0);
    const order = await prisma.Orders.create({
      data: {
        orderNumber,
        clientId,
        advisorId: advisorId || null,
        deliveryPersonId: deliveryPersonId || null,
        deliveryAddressId: deliveryAddressId || null,
        paymentMethod: paymentMethod || 'efectivo',
        total,
        note: note || '',
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: Number(item.quantity) * Number(item.unitPrice),
          })),
        },
      },
    });
    res.status(201).json(order);
  } catch (err) {
    console.error('Error creating order', err);
    res.status(500).json({ error: 'Error creating order' });
  }
});

app.put('/api/orders/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { status, advisorId, deliveryPersonId, paymentMethod, note } = req.body;

  try {
    const updated = await prisma.Orders.update({
      where: { id_order: id },
      data: {
        status: status || undefined,
        advisorId: advisorId || undefined,
        deliveryPersonId: deliveryPersonId || undefined,
        paymentMethod: paymentMethod || undefined,
        note: note || undefined,
      },
    });
    res.json(updated);
  } catch (err) {
    console.error('Error updating order', err);
    res.status(500).json({ error: 'Error updating order' });
  }
});

app.delete('/api/orders/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.OrderItems.deleteMany({ where: { orderId: id } });
    await prisma.Payment.deleteMany({ where: { orderId: id } });
    await prisma.Deliveries.deleteMany({ where: { orderId: id } });
    await prisma.Returns.deleteMany({ where: { idOrder: id } });
    await prisma.Sales.deleteMany({ where: { idOrder: id } });
    await prisma.Rating.deleteMany({ where: { orderId: id } });
    await prisma.Orders.delete({ where: { id_order: id } });
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting order', err);
    res.status(500).json({ error: 'Error deleting order' });
  }
});

app.get('/api/deliveries', requireAdmin, async (req, res) => {
  try {
    const deliveries = await prisma.Deliveries.findMany({
      include: {
        order: true,
        deliveryPerson: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(deliveries);
  } catch (err) {
    console.error('Error fetching deliveries', err);
    res.status(500).json({ error: 'Error fetching deliveries' });
  }
});

app.get('/api/deliveries/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const delivery = await prisma.Deliveries.findUnique({
      where: { id_delivery: id },
      include: {
        order: true,
        deliveryPerson: true,
      },
    });
    if (!delivery) return res.status(404).json({ error: 'Delivery not found' });
    res.json(delivery);
  } catch (err) {
    console.error('Error fetching delivery', err);
    res.status(500).json({ error: 'Error fetching delivery' });
  }
});

app.post('/api/deliveries', requireAdmin, async (req, res) => {
  const { total, address, city, phone, idCustomer, idEmployee, idOrder, status, pickupAt, deliveredAt, routeInfo, note, deliveryPersonId } = req.body;
  try {
    const created = await prisma.Deliveries.create({
      data: {
        total: total || null,
        address: address || null,
        city: city || null,
        phone: phone || null,
        idCustomer: idCustomer || null,
        idEmployee: idEmployee || null,
        idOrder: idOrder || null,
        deliveryPersonId: deliveryPersonId || null,
        status: status || 'pendiente',
        pickupAt: pickupAt ? new Date(pickupAt) : null,
        deliveredAt: deliveredAt ? new Date(deliveredAt) : null,
        routeInfo: routeInfo || null,
        note: note || null,
      },
    });
    res.status(201).json(created);
  } catch (err) {
    console.error('Error creating delivery', err);
    res.status(500).json({ error: 'Error creating delivery' });
  }
});

app.put('/api/deliveries/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { status, routeInfo, note, pickupAt, deliveredAt } = req.body;
  try {
    const updated = await prisma.Deliveries.update({
      where: { id_delivery: id },
      data: {
        status: status || undefined,
        routeInfo: routeInfo || undefined,
        note: note || undefined,
        pickupAt: pickupAt ? new Date(pickupAt) : undefined,
        deliveredAt: deliveredAt ? new Date(deliveredAt) : undefined,
      },
    });
    res.json(updated);
  } catch (err) {
    console.error('Error updating delivery', err);
    res.status(500).json({ error: 'Error updating delivery' });
  }
});

app.get('/api/orders/summary', requireAdmin, async (req, res) => {
  try {
    const totalOrders = await prisma.Orders.count();
    const completedOrders = await prisma.Orders.count({ where: { status: 'entregado' } });
    const pendingOrders = await prisma.Orders.count({ where: { status: 'pendiente' } });
    const totalSales = await prisma.Orders.aggregate({ _sum: { total: true } });
    res.json({ totalOrders, completedOrders, pendingOrders, totalSales: totalSales._sum.total || 0 });
  } catch (err) {
    console.error('Error fetching order summary', err);
    res.status(500).json({ error: 'Error fetching order summary' });
  }
});

app.get('/api/users', requireAdmin, async (req, res) => {
  try {
    const { role, search } = req.query;
    const where = {
      AND: [
        role ? { role: String(role) } : {},
        search
          ? {
              OR: [
                { email: { contains: String(search), mode: 'insensitive' } },
                { name: { contains: String(search), mode: 'insensitive' } },
                { phone: { contains: String(search), mode: 'insensitive' } },
              ],
            }
          : {},
      ],
    };

    const users = await prisma.Users.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id_user: true,
        email: true,
        role: true,
        name: true,
        phone: true,
        status: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.get('/api/users/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const user = await prisma.Users.findUnique({
      where: { id_user: id },
      select: {
        id_user: true,
        email: true,
        role: true,
        name: true,
        phone: true,
        status: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching user' });
  }
});

app.post('/api/users', requireAdmin, async (req, res) => {
  const { email, password, name, role, phone, status } = req.body;

  if (!email || !name || !role) {
    return res.status(400).json({ error: 'Email, nombre y rol son requeridos' });
  }
  if (role === 'admin') {
    return res.status(403).json({ error: 'No está permitido crear un usuario administrador' });
  }

  try {
    const existing = await prisma.Users.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'Email ya está registrado' });
    }

    const hashedPassword = password ? bcrypt.hashSync(password, 10) : null;
    const newUser = await prisma.Users.create({
      data: {
        email,
        name,
        role,
        phone: phone || null,
        status: status || 'activo',
        password: hashedPassword,
      },
      select: {
        id_user: true,
        email: true,
        role: true,
        name: true,
        phone: true,
        status: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creando usuario' });
  }
});

app.put('/api/users/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { email, password, name, role, phone, status } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ error: 'Email, nombre y rol son requeridos' });
  }
  if (role === 'admin') {
    const existing = await prisma.Users.findUnique({ where: { id_user: id } });
    if (existing && existing.role !== 'admin') {
      return res.status(403).json({ error: 'No está permitido cambiar un usuario a administrador' });
    }
  }

  try {
    const existing = await prisma.Users.findUnique({ where: { id_user: id } });
    if (!existing) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if (existing.role === 'admin' && role !== 'admin') {
      return res.status(403).json({ error: 'No está permitido cambiar el rol del administrador' });
    }
    if (role !== 'admin' && existing.role === 'admin') {
      return res.status(403).json({ error: 'No está permitido modificar este administrador' });
    }

    const updateData = {
      email,
      name,
      role,
      phone: phone || null,
      status: status || 'activo',
    };

    if (password) {
      updateData.password = bcrypt.hashSync(password, 10);
    }

    const updatedUser = await prisma.Users.update({
      where: { id_user: id },
      data: updateData,
      select: {
        id_user: true,
        email: true,
        role: true,
        name: true,
        phone: true,
        status: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'Email ya está registrado' });
    }
    res.status(500).json({ error: 'Error actualizando usuario' });
  }
});

app.delete('/api/users/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const existing = await prisma.Users.findUnique({ where: { id_user: id } });
    if (!existing) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if (existing.role === 'admin') {
      return res.status(403).json({ error: 'No está permitido eliminar al administrador' });
    }

    await prisma.Users.delete({ where: { id_user: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error eliminando usuario' });
  }
});

app.get('/api/dashboard/metrics', requireAdmin, async (req, res) => {
  try {
    const totalUsers = await prisma.Users.count();
    const totalClients = await prisma.Users.count({ where: { role: { in: ['cliente', 'user'] } } });
    const totalAdvisors = await prisma.Users.count({ where: { role: 'asesor' } });
    const totalDelivery = await prisma.Users.count({ where: { role: 'domiciliario' } });
    const totalAdminUsers = await prisma.Users.count({ where: { role: 'admin' } });
    const totalProducts = await prisma.Products.count();
    const lowStockProducts = await prisma.Products.count({ where: { stock: { lt: 20 } } });
    const totalStock = await prisma.Products.aggregate({ _sum: { stock: true } });
    const totalOrders = await prisma.Orders.count();
    const totalSales = await prisma.Orders.aggregate({ _sum: { total: true } });

    res.json({
      totalUsers,
      totalClients,
      totalAdvisors,
      totalDelivery,
      totalAdminUsers,
      totalProducts,
      lowStockProducts,
      totalStock: totalStock._sum.stock || 0,
      totalSales: totalSales._sum.total || 0,
      totalOrders,
      salesGrowth: 12,
      ordersGrowth: 8,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching dashboard metrics' });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "Backend funcionando 🚀" });
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email y password requeridos' });
  try {
    const user = await prisma.Users.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
    if (!user.password) return res.status(401).json({ error: 'Credenciales inválidas' });
    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(401).json({ error: 'Credenciales inválidas' });
    await prisma.Users.update({ where: { id_user: user.id_user }, data: { lastLoginAt: new Date() } });
    const token = generateToken(user);
    res.json({ token, user: { id: user.id_user, email: user.email, role: user.role, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error autenticando' });
  }
});

// Register endpoint (email/password)
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email y password requeridos' });
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@surtitelas.com';
    if (email === adminEmail) return res.status(403).json({ error: 'No está permitido crear el usuario admin' });
    const existing = await prisma.Users.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Usuario ya existe' });
    const hashed = bcrypt.hashSync(password, 10);
    const user = await prisma.Users.create({ data: { email, password: hashed, role: 'cliente', name: name || '' } });
    const token = generateToken(user);
    res.status(201).json({ token, user: { id: user.id_user, email: user.email, role: user.role, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error registrando usuario' });
  }
});

// Google Sign-In endpoint
app.post('/api/auth/google', async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ error: 'idToken requerido' });
  try {
    // Validate token with Google
    const verifyUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`;
    const resp = await fetch(verifyUrl);
    if (!resp.ok) return res.status(401).json({ error: 'Token de Google inválido' });
    const payload = await resp.json();
    const email = payload.email;
    const name = payload.name || payload.email?.split('@')[0] || '';
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@surtitelas.com';
    if (!email) return res.status(400).json({ error: 'Email no presente en token de Google' });

    if (email === adminEmail) {
      // Admin must exist as seed; do not allow creating admin via Google
      const admin = await prisma.Users.findUnique({ where: { email } });
      if (!admin) return res.status(403).json({ error: 'Admin no disponible. Contacte al administrador del sistema.' });
      const token = generateToken(admin);
      return res.json({ token, user: { id: admin.id_user, email: admin.email, role: admin.role, name: admin.name } });
    }

    let user = await prisma.Users.findUnique({ where: { email } });
    if (!user) {
      // Create a new user from Google sign-in (no password)
      user = await prisma.Users.create({ data: { email, name, role: 'cliente', password: null } });
    }
    const token = generateToken(user);
    res.json({ token, user: { id: user.id_user, email: user.email, role: user.role, name: user.name } });
  } catch (err) {
    console.error('Error en Google auth:', err);
    res.status(500).json({ error: 'Error verificando token de Google' });
  }
});

// Additional CRUD endpoints to cover the Prisma schema

// Documents Types
app.get('/api/documents-types', requireAdmin, async (req, res) => {
  try {
    const list = await prisma.DocumentsType.findMany();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching document types' });
  }
});

app.get('/api/documents-types/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await prisma.DocumentsType.findUnique({ where: { id_document_type: id } });
    if (!item) return res.status(404).json({ error: 'Document type not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching document type' });
  }
});

app.post('/api/documents-types', requireAdmin, async (req, res) => {
  const { documentType } = req.body;
  if (!documentType) return res.status(400).json({ error: 'documentType es requerido' });
  try {
    const created = await prisma.DocumentsType.create({ data: { documentType } });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating document type' });
  }
});

app.put('/api/documents-types/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { documentType } = req.body;
  try {
    const updated = await prisma.DocumentsType.update({ where: { id_document_type: id }, data: { documentType } });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating document type' });
  }
});

app.delete('/api/documents-types/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.DocumentsType.delete({ where: { id_document_type: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting document type' });
  }
});

// Roles
app.get('/api/roles', requireAdmin, async (req, res) => {
  try {
    const list = await prisma.Roles.findMany({ include: { permission: true } });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching roles' });
  }
});

app.get('/api/roles/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await prisma.Roles.findUnique({ where: { id_role: id }, include: { permission: true } });
    if (!item) return res.status(404).json({ error: 'Role not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching role' });
  }
});

app.post('/api/roles', requireAdmin, async (req, res) => {
  const { name, description, status, idPermission } = req.body;
  if (!name) return res.status(400).json({ error: 'name es requerido' });
  try {
    const created = await prisma.Roles.create({ data: { name, description: description || null, status: status || 1, idPermission: idPermission || null } });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating role' });
  }
});

app.put('/api/roles/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, description, status, idPermission } = req.body;
  try {
    const updated = await prisma.Roles.update({ where: { id_role: id }, data: { name, description: description || null, status: status || 1, idPermission: idPermission || null } });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating role' });
  }
});

app.delete('/api/roles/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.Roles.delete({ where: { id_role: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting role' });
  }
});

// Products Categories
app.get('/api/products-categories', requireAdmin, async (req, res) => {
  try {
    const list = await prisma.ProductsCategory.findMany();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching product categories' });
  }
});

app.get('/api/products-categories/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await prisma.ProductsCategory.findUnique({ where: { id_product_category: id } });
    if (!item) return res.status(404).json({ error: 'Product category not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching product category' });
  }
});

app.post('/api/products-categories', requireAdmin, async (req, res) => {
  const { name, description, status } = req.body;
  if (!name) return res.status(400).json({ error: 'name es requerido' });
  try {
    const created = await prisma.ProductsCategory.create({ data: { name, description: description || null, status: status || 1 } });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating product category' });
  }
});

app.put('/api/products-categories/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, description, status } = req.body;
  try {
    const updated = await prisma.ProductsCategory.update({ where: { id_product_category: id }, data: { name, description: description || null, status: status || 1 } });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating product category' });
  }
});

app.delete('/api/products-categories/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.ProductsCategory.delete({ where: { id_product_category: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting product category' });
  }
});

// Addresses
app.get('/api/addresses', requireAdmin, async (req, res) => {
  try {
    const list = await prisma.Address.findMany({ include: { user: true } });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching addresses' });
  }
});

app.get('/api/addresses/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await prisma.Address.findUnique({ where: { id_address: id }, include: { user: true } });
    if (!item) return res.status(404).json({ error: 'Address not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching address' });
  }
});

app.post('/api/addresses', requireAdmin, async (req, res) => {
  const { label, street, city, state, zipCode, country, phone, userId } = req.body;
  if (!label || !street || !city || !state || !zipCode || !country || !userId) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }
  try {
    const created = await prisma.Address.create({ data: { label, street, city, state, zipCode, country, phone: phone || null, userId } });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating address' });
  }
});

app.put('/api/addresses/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { label, street, city, state, zipCode, country, phone, userId } = req.body;
  try {
    const updated = await prisma.Address.update({ where: { id_address: id }, data: { label, street, city, state, zipCode, country, phone: phone || null, userId } });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating address' });
  }
});

app.delete('/api/addresses/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.Address.delete({ where: { id_address: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting address' });
  }
});

// Suppliers
app.get('/api/suppliers', requireAdmin, async (req, res) => {
  try {
    const list = await prisma.Suppliers.findMany();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching suppliers' });
  }
});

app.get('/api/suppliers/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await prisma.Suppliers.findUnique({ where: { id_supplier: id } });
    if (!item) return res.status(404).json({ error: 'Supplier not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching supplier' });
  }
});

app.post('/api/suppliers', requireAdmin, async (req, res) => {
  const { name, phone, email, address, status } = req.body;
  if (!name) return res.status(400).json({ error: 'name es requerido' });
  try {
    const created = await prisma.Suppliers.create({ data: { name, phone: phone || null, email: email || null, address: address || null, status: status || 1 } });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating supplier' });
  }
});

app.put('/api/suppliers/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, phone, email, address, status } = req.body;
  try {
    const updated = await prisma.Suppliers.update({ where: { id_supplier: id }, data: { name, phone: phone || null, email: email || null, address: address || null, status: status || 1 } });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating supplier' });
  }
});

app.delete('/api/suppliers/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.Suppliers.delete({ where: { id_supplier: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting supplier' });
  }
});

// Workshops
app.get('/api/workshops', requireAdmin, async (req, res) => {
  try {
    const list = await prisma.Workshops.findMany();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching workshops' });
  }
});

app.get('/api/workshops/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await prisma.Workshops.findUnique({ where: { id_workshop: id } });
    if (!item) return res.status(404).json({ error: 'Workshop not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching workshop' });
  }
});

app.post('/api/workshops', requireAdmin, async (req, res) => {
  const { name, phone, address, status } = req.body;
  if (!name) return res.status(400).json({ error: 'name es requerido' });
  try {
    const created = await prisma.Workshops.create({ data: { name, phone: phone || null, address: address || null, status: status || 1 } });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating workshop' });
  }
});

app.put('/api/workshops/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, phone, address, status } = req.body;
  try {
    const updated = await prisma.Workshops.update({ where: { id_workshop: id }, data: { name, phone: phone || null, address: address || null, status: status || 1 } });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating workshop' });
  }
});

app.delete('/api/workshops/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.Workshops.delete({ where: { id_workshop: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting workshop' });
  }
});

// Customers
app.get('/api/customers', requireAdmin, async (req, res) => {
  try {
    const list = await prisma.Customers.findMany({ include: { documentType: true, user: true } });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching customers' });
  }
});

app.get('/api/customers/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await prisma.Customers.findUnique({ where: { id_customer: id }, include: { documentType: true, user: true } });
    if (!item) return res.status(404).json({ error: 'Customer not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching customer' });
  }
});

app.post('/api/customers', requireAdmin, async (req, res) => {
  const { name, lastName, phone, email, address, status, idDocument_Type, idUser } = req.body;
  if (!name || !lastName) return res.status(400).json({ error: 'name y lastName son requeridos' });
  try {
    const created = await prisma.Customers.create({ data: { name, lastName, phone: phone || null, email: email || null, address: address || null, status: status || 1, idDocument_Type: idDocument_Type || null, idUser: idUser || null } });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating customer' });
  }
});

app.put('/api/customers/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, lastName, phone, email, address, status, idDocument_Type, idUser } = req.body;
  try {
    const updated = await prisma.Customers.update({ where: { id_customer: id }, data: { name, lastName, phone: phone || null, email: email || null, address: address || null, status: status || 1, idDocument_Type: idDocument_Type || null, idUser: idUser || null } });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating customer' });
  }
});

app.delete('/api/customers/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.Customers.delete({ where: { id_customer: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting customer' });
  }
});

// Employees
app.get('/api/employees', requireAdmin, async (req, res) => {
  try {
    const list = await prisma.Employees.findMany({ include: { documentType: true, role: true, user: true } });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching employees' });
  }
});

app.get('/api/employees/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await prisma.Employees.findUnique({ where: { id_employee: id }, include: { documentType: true, role: true, user: true } });
    if (!item) return res.status(404).json({ error: 'Employee not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching employee' });
  }
});

app.post('/api/employees', requireAdmin, async (req, res) => {
  const { name, lastName, phone, hireDate, salary, status, idDocument_Type, idRole, idUser } = req.body;
  if (!name || !lastName || salary == null) return res.status(400).json({ error: 'name, lastName y salary son requeridos' });
  try {
    const created = await prisma.Employees.create({ data: { name, lastName, phone: phone || null, hireDate: hireDate ? new Date(hireDate) : null, salary, status: status || 1, idDocument_Type: idDocument_Type || null, idRole: idRole || null, idUser: idUser || null } });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating employee' });
  }
});

app.put('/api/employees/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, lastName, phone, hireDate, salary, status, idDocument_Type, idRole, idUser } = req.body;
  try {
    const updated = await prisma.Employees.update({ where: { id_employee: id }, data: { name, lastName, phone: phone || null, hireDate: hireDate ? new Date(hireDate) : null, salary, status: status || 1, idDocument_Type: idDocument_Type || null, idRole: idRole || null, idUser: idUser || null } });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating employee' });
  }
});

app.delete('/api/employees/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.Employees.delete({ where: { id_employee: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting employee' });
  }
});

// Supplies
app.get('/api/supplies', requireAdmin, async (req, res) => {
  try {
    const list = await prisma.Supplies.findMany({ include: { productCategory: true } });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching supplies' });
  }
});

app.get('/api/supplies/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await prisma.Supplies.findUnique({ where: { id_supply: id }, include: { productCategory: true } });
    if (!item) return res.status(404).json({ error: 'Supply not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching supply' });
  }
});

app.post('/api/supplies', requireAdmin, async (req, res) => {
  const { name, stock, status, idProductCategory } = req.body;
  if (!name) return res.status(400).json({ error: 'name es requerido' });
  try {
    const created = await prisma.Supplies.create({ data: { name, stock: stock || 0, status: status || 1, idProductCategory: idProductCategory || null } });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating supply' });
  }
});

app.put('/api/supplies/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, stock, status, idProductCategory } = req.body;
  try {
    const updated = await prisma.Supplies.update({ where: { id_supply: id }, data: { name, stock: stock || 0, status: status || 1, idProductCategory: idProductCategory || null } });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating supply' });
  }
});

app.delete('/api/supplies/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.Supplies.delete({ where: { id_supply: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting supply' });
  }
});

// Purchases
app.get('/api/purchases', requireAdmin, async (req, res) => {
  try {
    const list = await prisma.Purchases.findMany({ include: { supplier: true, details: true } });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching purchases' });
  }
});

app.get('/api/purchases/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await prisma.Purchases.findUnique({ where: { id_purchase: id }, include: { supplier: true, details: true } });
    if (!item) return res.status(404).json({ error: 'Purchase not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching purchase' });
  }
});

app.post('/api/purchases', requireAdmin, async (req, res) => {
  const { purchaseDate, total, status, idSupplier } = req.body;
  try {
    const created = await prisma.Purchases.create({ data: { purchaseDate: purchaseDate ? new Date(purchaseDate) : new Date(), total: total || null, status: status || 1, idSupplier: idSupplier || null } });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating purchase' });
  }
});

app.put('/api/purchases/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { purchaseDate, total, status, idSupplier } = req.body;
  try {
    const updated = await prisma.Purchases.update({ where: { id_purchase: id }, data: { purchaseDate: purchaseDate ? new Date(purchaseDate) : new Date(), total: total || null, status: status || 1, idSupplier: idSupplier || null } });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating purchase' });
  }
});

app.delete('/api/purchases/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.Purchases.delete({ where: { id_purchase: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting purchase' });
  }
});

// Purchase Details
app.get('/api/purchasing-details', requireAdmin, async (req, res) => {
  try {
    const list = await prisma.PurchasingDetails.findMany({ include: { purchase: true, product: true } });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching purchasing details' });
  }
});

app.get('/api/purchasing-details/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await prisma.PurchasingDetails.findUnique({ where: { id_purchase_detail: id }, include: { purchase: true, product: true } });
    if (!item) return res.status(404).json({ error: 'Purchase detail not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching purchasing detail' });
  }
});

app.post('/api/purchasing-details', requireAdmin, async (req, res) => {
  const { quantity, unitValue, subTotal, idPurchase, idProduct } = req.body;
  if (quantity == null || unitValue == null || !idPurchase || !idProduct) return res.status(400).json({ error: 'quantity, unitValue, idPurchase y idProduct son requeridos' });
  try {
    const created = await prisma.PurchasingDetails.create({ data: { quantity, unitValue, subTotal: subTotal || quantity * unitValue, idPurchase, idProduct } });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating purchasing detail' });
  }
});

app.put('/api/purchasing-details/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { quantity, unitValue, subTotal, idPurchase, idProduct } = req.body;
  try {
    const updated = await prisma.PurchasingDetails.update({ where: { id_purchase_detail: id }, data: { quantity, unitValue, subTotal: subTotal || quantity * unitValue, idPurchase, idProduct } });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating purchasing detail' });
  }
});

app.delete('/api/purchasing-details/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.PurchasingDetails.delete({ where: { id_purchase_detail: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting purchasing detail' });
  }
});

// Productions
app.get('/api/productions', requireAdmin, async (req, res) => {
  try {
    const list = await prisma.Productions.findMany({ include: { workshop: true, product: true, details: true, returns: true } });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching productions' });
  }
});

app.get('/api/productions/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await prisma.Productions.findUnique({ where: { id_production: id }, include: { workshop: true, product: true, details: true, returns: true } });
    if (!item) return res.status(404).json({ error: 'Production not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching production' });
  }
});

app.post('/api/productions', requireAdmin, async (req, res) => {
  const { status, idWorkshop, idProduct } = req.body;
  try {
    const created = await prisma.Productions.create({ data: { status: status || 1, idWorkshop: idWorkshop || null, idProduct: idProduct || null } });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating production' });
  }
});

app.put('/api/productions/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { status, idWorkshop, idProduct } = req.body;
  try {
    const updated = await prisma.Productions.update({ where: { id_production: id }, data: { status: status || 1, idWorkshop: idWorkshop || null, idProduct: idProduct || null } });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating production' });
  }
});

app.delete('/api/productions/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.Productions.delete({ where: { id_production: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting production' });
  }
});

// Production Details
app.get('/api/production-details', requireAdmin, async (req, res) => {
  try {
    const list = await prisma.ProductionDetails.findMany({ include: { production: true } });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching production details' });
  }
});

app.get('/api/production-details/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await prisma.ProductionDetails.findUnique({ where: { id_production_detail: id }, include: { production: true } });
    if (!item) return res.status(404).json({ error: 'Production detail not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching production detail' });
  }
});

app.post('/api/production-details', requireAdmin, async (req, res) => {
  const { quantityDelivered, amountReceived, dateReceived, deliveryDate, status, idProduction } = req.body;
  if (!idProduction) return res.status(400).json({ error: 'idProduction es requerido' });
  try {
    const created = await prisma.ProductionDetails.create({ data: { quantityDelivered: quantityDelivered || null, amountReceived: amountReceived || null, dateReceived: dateReceived ? new Date(dateReceived) : null, deliveryDate: deliveryDate ? new Date(deliveryDate) : null, status: status || null, idProduction } });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating production detail' });
  }
});

app.put('/api/production-details/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { quantityDelivered, amountReceived, dateReceived, deliveryDate, status, idProduction } = req.body;
  try {
    const updated = await prisma.ProductionDetails.update({ where: { id_production_detail: id }, data: { quantityDelivered: quantityDelivered || null, amountReceived: amountReceived || null, dateReceived: dateReceived ? new Date(dateReceived) : null, deliveryDate: deliveryDate ? new Date(deliveryDate) : null, status: status || null, idProduction } });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating production detail' });
  }
});

app.delete('/api/production-details/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.ProductionDetails.delete({ where: { id_production_detail: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting production detail' });
  }
});

// Returns
app.get('/api/returns', requireAdmin, async (req, res) => {
  try {
    const list = await prisma.Returns.findMany({ include: { order: true, production: true, details: true } });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching returns' });
  }
});

app.get('/api/returns/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await prisma.Returns.findUnique({ where: { id_return: id }, include: { order: true, production: true, details: true } });
    if (!item) return res.status(404).json({ error: 'Return not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching return' });
  }
});

app.post('/api/returns', requireAdmin, async (req, res) => {
  const { returnDate, reason, status, idOrder, idProduction } = req.body;
  try {
    const created = await prisma.Returns.create({ data: { returnDate: returnDate ? new Date(returnDate) : new Date(), reason: reason || null, status: status || 1, idOrder: idOrder || null, idProduction: idProduction || null } });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating return' });
  }
});

app.put('/api/returns/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { returnDate, reason, status, idOrder, idProduction } = req.body;
  try {
    const updated = await prisma.Returns.update({ where: { id_return: id }, data: { returnDate: returnDate ? new Date(returnDate) : new Date(), reason: reason || null, status: status || 1, idOrder: idOrder || null, idProduction: idProduction || null } });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating return' });
  }
});

app.delete('/api/returns/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.Returns.delete({ where: { id_return: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting return' });
  }
});

// Returns Details
app.get('/api/returns-details', requireAdmin, async (req, res) => {
  try {
    const list = await prisma.ReturnsDetails.findMany({ include: { returnRecord: true, product: true } });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching returns details' });
  }
});

app.get('/api/returns-details/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await prisma.ReturnsDetails.findUnique({ where: { id_return_detail: id }, include: { returnRecord: true, product: true } });
    if (!item) return res.status(404).json({ error: 'Return detail not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching return detail' });
  }
});

app.post('/api/returns-details', requireAdmin, async (req, res) => {
  const { quantity, subtotal, idReturn, idProduct } = req.body;
  if (quantity == null || !idReturn || !idProduct) return res.status(400).json({ error: 'quantity, idReturn y idProduct son requeridos' });
  try {
    const created = await prisma.ReturnsDetails.create({ data: { quantity, subtotal: subtotal || null, idReturn, idProduct } });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating return detail' });
  }
});

app.put('/api/returns-details/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { quantity, subtotal, idReturn, idProduct } = req.body;
  try {
    const updated = await prisma.ReturnsDetails.update({ where: { id_return_detail: id }, data: { quantity, subtotal: subtotal || null, idReturn, idProduct } });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating return detail' });
  }
});

app.delete('/api/returns-details/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.ReturnsDetails.delete({ where: { id_return_detail: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting return detail' });
  }
});

// Sales
app.get('/api/sales', requireAdmin, async (req, res) => {
  try {
    const list = await prisma.Sales.findMany({ include: { customer: true, order: true, details: true } });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching sales' });
  }
});

app.get('/api/sales/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await prisma.Sales.findUnique({ where: { id_sale: id }, include: { customer: true, order: true, details: true } });
    if (!item) return res.status(404).json({ error: 'Sale not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching sale' });
  }
});

app.post('/api/sales', requireAdmin, async (req, res) => {
  const { saleDate, total, quantity, unitValue, vatValue, discountValue, totalValue, status, idCustomer, idOrder } = req.body;
  try {
    const created = await prisma.Sales.create({ data: { saleDate: saleDate ? new Date(saleDate) : new Date(), total: total || null, quantity: quantity || null, unitValue: unitValue || null, vatValue: vatValue || null, discountValue: discountValue || null, totalValue: totalValue || null, status: status || null, idCustomer: idCustomer || null, idOrder: idOrder || null } });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating sale' });
  }
});

app.put('/api/sales/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { saleDate, total, quantity, unitValue, vatValue, discountValue, totalValue, status, idCustomer, idOrder } = req.body;
  try {
    const updated = await prisma.Sales.update({ where: { id_sale: id }, data: { saleDate: saleDate ? new Date(saleDate) : new Date(), total: total || null, quantity: quantity || null, unitValue: unitValue || null, vatValue: vatValue || null, discountValue: discountValue || null, totalValue: totalValue || null, status: status || null, idCustomer: idCustomer || null, idOrder: idOrder || null } });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating sale' });
  }
});

app.delete('/api/sales/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.Sales.delete({ where: { id_sale: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting sale' });
  }
});

// Sales Details
app.get('/api/sales-details', requireAdmin, async (req, res) => {
  try {
    const list = await prisma.SalesDetails.findMany({ include: { sale: true, product: true } });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching sales details' });
  }
});

app.get('/api/sales-details/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await prisma.SalesDetails.findUnique({ where: { id_sale_detail: id }, include: { sale: true, product: true } });
    if (!item) return res.status(404).json({ error: 'Sale detail not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching sale detail' });
  }
});

app.post('/api/sales-details', requireAdmin, async (req, res) => {
  const { idSale, idProduct } = req.body;
  if (!idSale || !idProduct) return res.status(400).json({ error: 'idSale y idProduct son requeridos' });
  try {
    const created = await prisma.SalesDetails.create({ data: { idSale, idProduct } });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating sale detail' });
  }
});

app.put('/api/sales-details/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { idSale, idProduct } = req.body;
  try {
    const updated = await prisma.SalesDetails.update({ where: { id_sale_detail: id }, data: { idSale, idProduct } });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating sale detail' });
  }
});

app.delete('/api/sales-details/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.SalesDetails.delete({ where: { id_sale_detail: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting sale detail' });
  }
});

// Payments
app.get('/api/payments', requireAdmin, async (req, res) => {
  try {
    const list = await prisma.Payment.findMany({ include: { order: true } });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching payments' });
  }
});

app.get('/api/payments/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await prisma.Payment.findUnique({ where: { id_payment: id }, include: { order: true } });
    if (!item) return res.status(404).json({ error: 'Payment not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching payment' });
  }
});

app.post('/api/payments', requireAdmin, async (req, res) => {
  const { paymentDate, amount, status, idOrder } = req.body;
  if (amount == null) return res.status(400).json({ error: 'amount es requerido' });
  try {
    const data = {
      paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
      amount,
      status: status || 1,
    };
    if (idOrder !== undefined && idOrder !== null) {
      data.order = { connect: { id_order: idOrder } };
    }
    const created = await prisma.Payment.create({ data });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating payment' });
  }
});

app.put('/api/payments/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { paymentDate, amount, status, idOrder } = req.body;
  try {
    const data = {
      paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
      amount,
      status: status || 1,
    };
    if (idOrder !== undefined && idOrder !== null) {
      data.order = { connect: { id_order: idOrder } };
    }
    const updated = await prisma.Payment.update({ where: { id_payment: id }, data });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating payment' });
  }
});

app.delete('/api/payments/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.Payment.delete({ where: { id_payment: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting payment' });
  }
});

// Order Items
app.get('/api/order-items', requireAdmin, async (req, res) => {
  try {
    const list = await prisma.OrderItems.findMany({ include: { order: true, product: true } });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching order items' });
  }
});

app.get('/api/order-items/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const item = await prisma.OrderItems.findUnique({ where: { id_order_item: id }, include: { order: true, product: true } });
    if (!item) return res.status(404).json({ error: 'Order item not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching order item' });
  }
});

app.post('/api/order-items', requireAdmin, async (req, res) => {
  const { orderId, productId, quantity, unitPrice, total } = req.body;
  if (!orderId || !productId || quantity == null || unitPrice == null) return res.status(400).json({ error: 'orderId, productId, quantity y unitPrice son requeridos' });
  try {
    const created = await prisma.OrderItems.create({ data: { orderId, productId, quantity, unitPrice, total: total || quantity * unitPrice } });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating order item' });
  }
});

app.put('/api/order-items/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { orderId, productId, quantity, unitPrice, total } = req.body;
  try {
    const updated = await prisma.OrderItems.update({ where: { id_order_item: id }, data: { orderId, productId, quantity, unitPrice, total: total || quantity * unitPrice } });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating order item' });
  }
});

app.delete('/api/order-items/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.OrderItems.delete({ where: { id_order_item: id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting order item' });
  }
});

// Servir el frontend para todas las rutas no-API (SPA fallback)
app.use((req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await seedProducts();
    await seedAdminUser();
    await seedSampleUsers();
    await seedSampleOrders();
    app.listen(PORT, () => {
      console.log(`Servidor funcionando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();