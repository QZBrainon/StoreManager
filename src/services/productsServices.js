const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const allProducts = await productsModel.selectAll();
  return allProducts;
};

const getProductById = async (id) => {
  const productById = await productsModel.selectById(Number(id));
  if (!productById) return { message: 'Product not found' };
  return productById;
};

module.exports = {
  getAllProducts,
  getProductById,
};