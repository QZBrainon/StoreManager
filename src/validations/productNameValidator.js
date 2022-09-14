const { productsSchema } = require('./productsSchema');

const productNameValidator = async (req, res, next) => {
  const validation = productsSchema.validate(req.body);
  if (!validation.error) return next();

  const { error: { details: [{ message }] } } = validation;
  if (message === '"name" is required') {
    return res.status(400).json({ message });
  }
  
  if (message === '"name" length must be at least 5 characters long') {
    return res.status(422).json({ message });
  }
};

module.exports = productNameValidator;