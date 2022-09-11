const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.queryAllProducts);

router.get('/:id', productsController.queryById);

module.exports = router;