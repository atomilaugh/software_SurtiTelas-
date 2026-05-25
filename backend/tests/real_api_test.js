const fetch = global.fetch || require('node-fetch');
const base = 'http://localhost:3000';
const results = [];

async function test(method, endpoint, body, expectedStatus = 200) {
  try {
    const opts = { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${global.token}` } };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(base + endpoint, opts);
    const text = await res.text();
    let data = text;
    try { data = JSON.parse(text); } catch (e) {}
    const status = res.status;
    const success = status === expectedStatus || (status >= 200 && status < 300);
    const icon = success ? '✓' : '✗';
    results.push({ method, endpoint, status, success, data });
    console.log(`${icon} ${method} ${endpoint} → ${status}`, success ? '' : `(expected ${expectedStatus})`);
    return { status, data, success };
  } catch (e) {
    console.error(`✗ ${method} ${endpoint} → ERROR`, e.message);
    results.push({ method, endpoint, status: 'ERROR', success: false, error: e.message });
    return { status: 'ERROR', success: false };
  }
}

async function main() {
  console.log('=== INICIO PRUEBAS API BACKEND ===\n');
  
  // LOGIN
  console.log('1. AUTENTICACIÓN');
  const loginRes = await test('POST', '/api/auth/login', 
    { email: 'admin@surtitelas.com', password: 'surtitelas1015072143' }, 201);
  global.token = loginRes.data?.token;
  if (!global.token) {
    console.error('LOGIN FALLIDO, no se puede continuar');
    return;
  }
  console.log();

  // CRUD para cada recurso
  const resources = [
    { name: 'documents-types', endpoint: '/api/documents-types', create: { documentType: 'Cédula' }, update: { documentType: 'Cédula Actualizada' }, idField: 'id_document_type' },
    { name: 'roles', endpoint: '/api/roles', create: { name: 'role_test', description: 'test' }, update: { name: 'role_test_upd' }, idField: 'id_role' },
    { name: 'products-categories', endpoint: '/api/products-categories', create: { name: 'Categoría Test', description: 'desc' }, update: { name: 'Categoría Test Upd' }, idField: 'id_product_category' },
    { name: 'products', endpoint: '/api/products', create: { name: 'Producto Test', price: 9.9, description: 'test', tipo: 'Sintético', color: 'Negro', stock: 5 }, update: { name: 'Producto Test Upd', stock: 10 }, idField: 'id_product' },
    { name: 'suppliers', endpoint: '/api/suppliers', create: { name: 'Proveedor Test', phone: '3000000' }, update: { name: 'Proveedor Test Upd' }, idField: 'id_supplier' },
    { name: 'workshops', endpoint: '/api/workshops', create: { name: 'Taller Test' }, update: { name: 'Taller Test Upd' }, idField: 'id_workshop' },
    { name: 'customers', endpoint: '/api/customers', create: { name: 'Cliente', lastName: 'Test', phone: '300', email: `test${Date.now()}@test.com` }, update: { name: 'Cliente Upd' }, idField: 'id_customer' },
    { name: 'employees', endpoint: '/api/employees', create: { name: 'Emp', lastName: 'Test', salary: 1000 }, update: { name: 'Emp Upd' }, idField: 'id_employee' },
    { name: 'supplies', endpoint: '/api/supplies', create: { name: 'Supply Test', stock: 5 }, update: { stock: 15 }, idField: 'id_supply' },
    { name: 'purchases', endpoint: '/api/purchases', create: { purchaseDate: new Date().toISOString(), total: 100 }, update: { total: 150 }, idField: 'id_purchase' },
    { name: 'productions', endpoint: '/api/productions', create: { status: 1 }, update: { status: 2 }, idField: 'id_production' },
    { name: 'sales', endpoint: '/api/sales', create: { saleDate: new Date().toISOString(), total: 50, status: 1 }, update: { total: 75 }, idField: 'id_sale' },
    { name: 'returns', endpoint: '/api/returns', create: { returnDate: new Date().toISOString(), reason: 'Test', status: 1 }, update: { reason: 'Test Upd' }, idField: 'id_return' },
    { name: 'deliveries', endpoint: '/api/deliveries', create: { address: 'Calle Test 123', city: 'Ciudad', phone: '3000' }, update: { address: 'Calle Test 456' }, idField: 'id_delivery' },
    { name: 'payments', endpoint: '/api/payments', create: { paymentDate: new Date().toISOString(), amount: 100, status: 1 }, update: { amount: 200 }, idField: 'id_payment' },
  ];

  for (let i = 0; i < resources.length; i++) {
    const r = resources[i];
    console.log(`${i+1}. ${r.name.toUpperCase()}`);
    
    // POST
    const postRes = await test('POST', r.endpoint, r.create, 201);
    const id = postRes.data?.[r.idField];
    
    // GET LIST
    await test('GET', r.endpoint, null, 200);
    
    // GET BY ID
    if (id) {
      await test('GET', `${r.endpoint}/${id}`, null, 200);
      
      // PUT
      await test('PUT', `${r.endpoint}/${id}`, r.update, 200);
      
      // DELETE
      await test('DELETE', `${r.endpoint}/${id}`, null, 204);
    }
    console.log();
  }

  // Resumen
  console.log('=== RESUMEN ===');
  const total = results.length;
  const success = results.filter(r => r.success).length;
  const failed = total - success;
  console.log(`Total: ${total} | ✓ Exitosos: ${success} | ✗ Fallidos: ${failed}`);
  console.log('\nDetalle de fallos:');
  results.filter(r => !r.success).forEach(r => {
    console.log(`  ${r.method} ${r.endpoint} → ${r.status} ${r.error ? r.error : ''}`);
  });
}

main().catch(e => {
  console.error('ERROR FATAL:', e);
  process.exit(1);
});
