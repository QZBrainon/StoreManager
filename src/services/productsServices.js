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

const updateProduct = async (product, id) => {
  const verifyProductId = await getProductById(id);
  if (!verifyProductId.id) return ({ message: 'Product not found' });
  await productsModel.update(product, id);
  return ({ id, name: product.name });
};

const deleteProduct = async (id) => {
  const verifyProductId = await getProductById(id);
  if (!verifyProductId.id) return ({ message: 'Product not found' });
  await productsModel.deleteProduct(id);
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
};