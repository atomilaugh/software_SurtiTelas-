require('dotenv').config();
const base = process.env.VITE_API_URL || 'http://127.0.0.1:3000';

(async () => {
  try {
    // Login
    const loginRes = await fetch(base + '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: process.env.ADMIN_EMAIL || 'admin@surtitelas.com', password: process.env.ADMIN_PASSWORD || 'admin123' })
    });
    const login = await loginRes.json();
    console.log('LOGIN', login);
    const token = login.token;

    // Try to create without token
    const createNoAuth = await fetch(base + '/api/products', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'NoAuth', price: 1 })
    });
    console.log('CREATE no auth status', createNoAuth.status);

    // Create with token
    const createAuth = await fetch(base + '/api/products', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ name: 'Auth Product', price: 3.14, tipo: 'Test', color: 'Negro', stock: 2 })
    });
    const created = await createAuth.json();
    console.log('CREATED with auth', createAuth.status, created);

    // Delete with token
    const del = await fetch(base + '/api/products/' + (created.id_product || created.id), { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + token } });
    console.log('DELETE status', del.status);

    process.exit(0);
  } catch (e) { console.error(e); process.exit(1); }
})();