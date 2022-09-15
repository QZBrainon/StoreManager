const { salesSchema } = require('./salesSchema');

const salesValidator = async (req, res, next) => {
  const validation = salesSchema.validate(req.body);
  if (!validation.error) return next();

  const { error: { details: [{ message }] } } = validation;

  if (message === '"productId" is required' || message === '"quantity" is required') {
    return res.status(400).json({ message });
  }
  
  if (message === '"quantity" must be greater than or equal to 1') {
    return res.status(422).json({ message });
  }
};

module.exports = salesValidator;