const { expect } = require('chai');
const sinon = require('sinon');

const salesServices = require('../../../src/services/salesServices')
const salesModel = require('../../../src/models/salesModel')

const mock = [
  {
    "saleId": 1,
    "productId": 1,
    "quantity": 5,
    "date": "2022-09-16T21:35:25.000Z"
  },
  {
    "saleId": 1,
    "productId": 2,
    "quantity": 10,
    "date": "2022-09-16T21:35:25.000Z"
  },
  {
    "saleId": 2,
    "productId": 3,
    "quantity": 15,
    "date": "2022-09-16T21:35:25.000Z"
  }
]