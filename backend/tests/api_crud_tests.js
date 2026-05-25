const fs = require('fs');
const path = require('path');
const baseDir = path.resolve(__dirname, '..');
const envPath = path.join(baseDir, '.env');

function parseEnv(p) {
  try {
    const txt = fs.readFileSync(p, 'utf8');
    const lines = txt.split(/\r?\n/);
    const out = {};
    for (const l of lines) {
      const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*"?(.*?)"?\s*$/i);
      if (m) out[m[1]] = m[2];
    }
    return out;
  } catch (e) {
    return {};
  }
}

const env = parseEnv(envPath);
const BASE = `http://localhost:${env.PORT || 3000}`;
const ADMIN_EMAIL = env.ADMIN_EMAIL || 'admin@surtitelas.com';
const ADMIN_PASSWORD = env.ADMIN_PASSWORD || 'admin123';

async function req(path, opts = {}) {
  const url = BASE + path;
  const res = await fetch(url, opts);
  const text = await res.text();
  let body = text;
  try { body = JSON.parse(text); } catch(e) {}
  return { status: res.status, body };
}

async function main() {
  console.log('Base URL', BASE);
  // login
  const login = await req('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }) });
  if (login.status !== 200) { console.error('LOGIN FAILED', login); return process.exit(1); }
  const token = login.body.token;
  console.log('LOGIN OK, token length', token?.length || 0);

  const authHeaders = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  const created = {};

  const resources = [
    { key: 'documents-types', path: '/api/documents-types', create: { documentType: 'DocType API Test' }, update: (r)=>({ documentType: r.documentType + ' Updated' }), idField: 'id_document_type' },
    { key: 'roles', path: '/api/roles', create: { name: 'role_api_test' , description: 'test' }, update: (r)=>({ name: r.name + '_upd' }), idField: 'id_role' },
    { key: 'products-categories', path: '/api/products-categories', create: { name: 'Cat API', description: 'cat test' }, update: (r)=>({ name: r.name + ' U' }), idField: 'id_product_category' },
    { key: 'suppliers', path: '/api/suppliers', create: { name: 'Sup API', phone: '3001112222' }, update: (r)=>({ name: r.name + ' U' }), idField: 'id_supplier' },
    { key: 'workshops', path: '/api/workshops', create: { name: 'Workshop API' }, update: (r)=>({ name: r.name + ' U' }), idField: 'id_workshop' },
    { key: 'products', path: '/api/products', create: { name: 'API Product', price: 9.9, description: 'test', tipo: 'Sintético', color: 'Negro', stock: 10 }, update: (r)=>({ name: r.name + ' U', stock: (r.stock||0) + 5 }), idField: 'id_product' },
    { key: 'users', path: '/api/users', create: { email: `api_user_${Date.now()}@test.local`, password: 'testpass', name: 'API User', role: 'cliente' }, update: (r)=>({ name: r.name + ' U' }), idField: 'id_user' },
    { key: 'customers', path: '/api/customers', create: (ctx)=>({ name: 'Cust API', lastName: 'Test', phone: '300000', email: `cust_${Date.now()}@test.local` }), update: (r)=>({ name: r.name + ' U' }), idField: 'id_customer' },
    { key: 'employees', path: '/api/employees', create: { name: 'Emp API', lastName: 'Test', salary: 1200 }, update: (r)=>({ name: r.name + ' U' }), idField: 'id_employee' },
    { key: 'supplies', path: '/api/supplies', create: { name: 'Supply API', stock: 5 }, update: (r)=>({ stock: (r.stock||0) + 10 }), idField: 'id_supply' },
    { key: 'purchases', path: '/api/purchases', create: { purchaseDate: new Date().toISOString(), total: 100 }, update: (r)=>({ total: (r.total||0) + 10 }), idField: 'id_purchase' },
    { key: 'productions', path: '/api/productions', create: { status: 1 }, update: (r)=>({ status: (r.status||1) }), idField: 'id_production' },
    { key: 'production-details', path: '/api/production-details', create: (ctx)=>({ idProduction: ctx.productions, quantityDelivered: 1 }), update: (r)=>({ quantityDelivered: (r.quantityDelivered||0) + 1 }), idField: 'id_production_detail' },
    { key: 'sales', path: '/api/sales', create: { saleDate: new Date().toISOString(), total: 0 }, update: (r)=>({ total: (r.total||0) + 1 }), idField: 'id_sale' },
    { key: 'payments', path: '/api/payments', create: { paymentDate: new Date().toISOString(), amount: 10 }, update: (r)=>({ amount: (r.amount||0) + 5 }), idField: 'id_payment' },
    { key: 'order-items', path: '/api/order-items', create: (ctx)=>({ orderId: ctx.orders, productId: ctx.products, quantity: 1, unitPrice: 100 }), update: (r)=>({ quantity: (r.quantity||1) + 1 }), idField: 'id_order_item' },
    { key: 'orders', path: '/api/orders', create: async (ctx)=>{
        // find a client user
        const usersRes = await req('/api/users?search=cliente', { headers: authHeaders });
        let clientId = null;
        if (Array.isArray(usersRes.body) && usersRes.body.length>0) clientId = usersRes.body[0].id_user;
        if (!clientId) {
          // fallback to admin
          const me = await req('/api/users', { headers: authHeaders });
          clientId = (Array.isArray(me.body) && me.body.length>0) ? me.body[0].id_user : null;
        }
        // ensure a product exists
        const p = await req('/api/products', { headers: authHeaders });
        let prodId = null;
        if (Array.isArray(p.body) && p.body.length>0) prodId = p.body[0].id_product;
        if (!prodId) {
          const createdP = await req('/api/products', { method: 'POST', headers: authHeaders, body: JSON.stringify({ name: 'OrderProduct API', price: 5, stock: 10 }) });
          if (createdP.status===201) prodId = createdP.body.id_product;
        }
        if (!clientId || !prodId) return { error: 'no client or product' };
        return {
          orderNumber: `API-ORD-${Date.now()}`,
          clientId,
          items: [{ productId: prodId, quantity: 1, unitPrice: 500 }]
        };
      }, update: (r)=>({ status: 'completado' }), idField: 'id_order' },
    { key: 'deliveries', path: '/api/deliveries', create: (ctx)=>({ orderId: ctx.orders, status: 'pendiente' }), update: (r)=>({ status: 'entregado' }), idField: 'id_delivery' },
    { key: 'returns', path: '/api/returns', create: { returnDate: new Date().toISOString(), reason: 'test' }, update: (r)=>({ reason: (r.reason||'') + ' updated' }), idField: 'id_return' },
    { key: 'returns-details', path: '/api/returns-details', create: (ctx)=>({ quantity: 1, idReturn: ctx.returns || null, idProduct: ctx.products || null }), update: (r)=>({ quantity: (r.quantity||1) + 1 }), idField: 'id_return_detail' },
    { key: 'sales-details', path: '/api/sales-details', create: (ctx)=>({ idSale: ctx.sales || null, idProduct: ctx.products || null }), update: (r)=>({ idSale: r.idSale }), idField: 'id_sale_detail' }
  ];

  for (const r of resources) {
    console.log('\n---- Resource', r.key, '----');
    let createBody = typeof r.create === 'function' ? await r.create(created) : r.create;
    if (createBody && createBody.error) { console.log('SKIP create:', createBody); continue; }

    // POST
    try {
      const post = await req(r.path, { method: 'POST', headers: authHeaders, body: JSON.stringify(createBody) });
      console.log('POST', r.path, post.status, post.body && (post.body.id || post.body[r.idField] || JSON.stringify(post.body)));
      if (post.status===201 && post.body) {
        const id = post.body[r.idField] || post.body.id || post.body[Object.keys(post.body)[0]];
        created[r.key] = id || post.body;
      }
    } catch (e) { console.error('POST ERR', e); }

    // GET list
    try {
      const list = await req(r.path, { headers: authHeaders });
      console.log('GET list', r.path, list.status, Array.isArray(list.body) ? `count=${list.body.length}` : JSON.stringify(list.body).slice(0,200));
      if (Array.isArray(list.body) && list.body.length>0 && !created[r.key]) {
        const first = list.body[0];
        created[r.key] = first[r.idField] || first.id || first;
      }
    } catch (e) { console.error('GET LIST ERR', e); }

    // GET by id
    const idVal = created[r.key];
    if (idVal) {
      try {
        const getid = await req(`${r.path}/${idVal}`, { headers: authHeaders });
        console.log('GET id', `${r.path}/${idVal}`, getid.status);
        if (getid.status===200) {
          // PUT update
          const obj = getid.body;
          const updBody = typeof r.update === 'function' ? r.update(obj) : r.update;
          if (updBody) {
            const put = await req(`${r.path}/${idVal}`, { method: 'PUT', headers: authHeaders, body: JSON.stringify(updBody) });
            console.log('PUT', `${r.path}/${idVal}`, put.status);
          }

          // DELETE
          const del = await req(`${r.path}/${idVal}`, { method: 'DELETE', headers: authHeaders });
          console.log('DELETE', `${r.path}/${idVal}`, del.status);
        }
      } catch (e) { console.error('GET/PUT/DELETE ERR', e); }
    } else {
      console.log('No id available to GET/PUT/DELETE for', r.key);
    }
  }

  console.log('\n---- Created summary ----');
  console.log(JSON.stringify(created, null, 2));
}

main().catch(e=>{ console.error(e); process.exit(1); });
