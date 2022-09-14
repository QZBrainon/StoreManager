const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const allProducts = await productsModel.selectAll();
  return allProducts;
};

const getProductById = async (id) => {
  const productById = await productsModel.selectById(Number(id));
  if (!productById) return ({ message: 'Product not found' });
  return productById;
};

const postProduct = async (product) => {
  const insertId = await productsModel.insert(product);
  return ({ id: insertId, name: product.name });
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
};