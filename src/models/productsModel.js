const conn = require('./connection');

const selectAll = async () => {
  const [result] = await conn.execute('SELECT * FROM StoreManager.products');
  return result;
};

const selectById = async (id) => {
  const [[result]] = await conn.execute(
    'SELECT * FROM StoreManager.products WHERE id=? ORDER BY id', [id],
  );
  return result;
};

const insert = async (product) => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [...Object.values(product)],
  );
  return insertId;
};

const update = async (product, id) => {
  await conn.execute(
  'UPDATE StoreManager.products SET name = ? WHERE id=?',
  [product.name, id],
);
  return id;
};

module.exports = {
  selectAll,
  selectById,
  insert,
  update,
};