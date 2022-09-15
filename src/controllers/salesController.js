const salesServices = require('../services/salesServices');

const postSale = async (req, res) => {
  const sale = req.body;
  const result = await salesServices.postSale(sale);
  return res.status(201).json(result);
};

module.exports = {
  postSale,
};