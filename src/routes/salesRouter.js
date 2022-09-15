const express = require('express');
const salesController = require('../controllers/salesController');
const salesValidator = require('../validations/salesValidator');

const router = express.Router();

router.post('/', salesValidator, salesController.postSale);

module.exports = router;