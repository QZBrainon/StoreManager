const Joi = require('joi');

const salesSchema = Joi.array().items({
  productId: Joi.number().required,
  quantity: Joi.number().min(1).required,
});

module.exports = {
  salesSchema,
};