const url = 'http://127.0.0.1:3000/api/products';

(async () => {
  try {
    const createResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Prueba CRUD',
        price: 22.5,
        description: 'Producto de prueba',
        tipo: 'Sintético',
        color: 'Rojo',
        stock: 10,
      }),
    });

    const created = await createResponse.json();
    console.log('CREATED', created);

    const id = created.id_product;

    const fetchResponse = await fetch(`${url}/${id}`);
    const fetched = await fetchResponse.json();
    console.log('FETCHED', fetched);

    const updateResponse = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Prueba CRUD Actualizada',
        price: 25,
        description: 'Actualizado',
        tipo: 'Sintético',
        color: 'Rojo',
        stock: 5,
      }),
    });
    const updated = await updateResponse.json();
    console.log('UPDATED', updated);

    const deleteResponse = await fetch(`${url}/${id}`, { method: 'DELETE' });
    console.log('DELETED', deleteResponse.status);

    const afterResponse = await fetch(`${url}/${id}`);
    console.log('AFTER STATUS', afterResponse.status);
    console.log('AFTER BODY', await afterResponse.text());
  } catch (error) {
    console.error('ERROR', error);
    process.exit(1);
  }
})();