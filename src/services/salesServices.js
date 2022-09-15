const salesModel = require('../models/salesModel');

const postSale = async (sale) => {
  await salesModel.insertSale(sale);
  const saleId = await salesModel.insertSaleProducts(sale);

  return { id: saleId, itemsSold: sale };
};

module.exports = {
  postSale,
};