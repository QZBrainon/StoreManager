const express = require('express');
const productsController = require('../controllers/productsController');
const productNameValidator = require('../validations/productNameValidator');

const router = express.Router();

router.get('/', productsController.queryAllProducts);

router.get('/:id', productsController.queryById);

router.post('/', productNameValidator, productsController.postProduct);

module.exports = router;