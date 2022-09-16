const camelize = require('camelize');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel'); 

const postSale = async (sale) => {
  const ids = sale.map((object) => object.productId);
  const checkIds = ids.map((id) => productsModel.selectById(id));
  const result = await Promise.all(checkIds);
  const error = result.some((object) => object === undefined);
  if (error) return ({ message: 'Product not found' });
  const saleId = await salesModel.insertSaleProducts(sale);

  return { id: saleId, itemsSold: sale };
};

const getAllSales = async () => {
  const result = await salesModel.queryAllSalesProducts();
  return camelize(result);
};

const getSalesById = async (id) => {
  const result = await salesModel.querySalesById(id);
  return camelize(result);
};

module.exports = {
  postSale,
  getAllSales,
  getSalesById,
};