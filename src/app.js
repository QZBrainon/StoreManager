const express = require('express');
require('express-async-errors');
const errorHandler = require('./middlewares/errorHandler');
const productRouter = require('./routes/productRouter');

const app = express();
app.use(express.json());
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo server.js para executar sua aplicação 
app.use(errorHandler);
module.exports = app;