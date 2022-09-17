const productsServices = require('../services/productsServices');

const queryAllProducts = async (_req, res) => {
    const response = await productsServices.getAllProducts();
    return res.status(200).json(response); 
}; 

const queryById = async (req, res) => {
    const { id } = req.params;
    const response = await productsServices.getProductById(id);
    if (response.message) return res.status(404).json(response);
    return res.status(200).json(response);
};

const postProduct = async (req, res) => {
  const response = await productsServices.postProduct(req.body);
  return res.status(201).send(response);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const response = await productsServices.updateProduct(product, id);
  if (response.message) {
    return res.status(404).json(response);
  }
  return res.status(200).json(response);
};

module.exports = {
  queryAllProducts,
  queryById,
  postProduct,
  updateProduct,
};