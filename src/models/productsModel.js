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

module.exports = {
  selectAll,
  selectById,
};