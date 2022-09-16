// const snakeize = require('snakeize');
const conn = require('./connection');

const insertSale = async () => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (now())',
  );
  return insertId;
};

const insertSaleProducts = async (saleProducts) => { // array tambem faz Object.values e cada ? se refere a uma coluna, mas para inserir várias linhas, deve-se inserir vários parenteses (?) com a quantidade de ? das colunas
  const placeholders = saleProducts.map((_sale) => '(?,?,?)');
  const saleId = await insertSale();
  const result = saleProducts.reduce((acc, currentValue) => {
    const values = Object.values(currentValue); 
    acc.push(saleId);
    values.forEach((value) => acc.push(value));
    return acc;
  }, []);

  await conn.execute(
    `INSERT INTO StoreManager.sales_products 
    (sale_id, product_id, quantity) VALUES ${placeholders}`,
    result,
  );
  return saleId;
};

const queryAllSalesProducts = async () => {
  const [result] = await conn.execute(
    `SELECT sp.sale_id, sp.product_id, sp.quantity, s.date FROM 
     StoreManager.sales AS s
     JOIN StoreManager.sales_products AS sp  where s.id=sp.sale_id
     ORDER BY sp.sale_id, sp.product_id`,
);
  return result;
};

const querySalesById = async (id) => {
  const [result] = await conn.execute(
  `SELECT sp.product_id, sp.quantity, s.date FROM 
     StoreManager.sales AS s
     JOIN StoreManager.sales_products AS sp 
     ON s.id=sp.sale_id
     WHERE sp.sale_id=?`,
    [id],
  );
  return result;
};

module.exports = {
  insertSale,
  insertSaleProducts,
  queryAllSalesProducts,
  querySalesById,
};