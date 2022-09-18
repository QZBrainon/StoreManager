const express = require('express');
const productsController = require('../controllers/productsController');
const productNameValidator = require('../validations/productNameValidator');

const router = express.Router();

router.get('/', productsController.queryAllProducts);

router.get('/:id', productsController.queryById);

router.post('/', productNameValidator, productsController.postProduct);

router.put('/:id', productNameValidator, productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;