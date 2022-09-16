const salesServices = require('../services/salesServices');

const postSale = async (req, res) => {
  const sale = req.body;
  const result = await salesServices.postSale(sale);
  const { message } = result;
  if (message) return res.status(404).json({ message });
  return res.status(201).json(result);
};

const selectAllSales = async (_req, res) => {
  const result = await salesServices.getAllSales();
  res.status(200).json(result);
};

const selectSalesById = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.getSalesById(id);
  if (result.length === 0) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(result);
};

module.exports = {
  postSale,
  selectAllSales,
  selectSalesById,
};