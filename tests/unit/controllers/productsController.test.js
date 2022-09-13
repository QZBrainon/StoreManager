const { expect } = require('chai');
const sinon = require('sinon');
const mock = require('./mocks/productsControllerMocks')
const productsService = require('../../../src/services/productsServices');
const productsController = require('../../../src/controllers/productsController')

describe('Testa a camada controller', () => {
  
  afterEach(sinon.restore);

  it('Testa caso de sucesso da resposta de todos os itens', async () => {
    
    sinon.stub(productsService, 'getAllProducts').resolves(mock);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)

    await productsController.queryAllProducts(req, res)

    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith(mock)
  })

  it('Testa caso de sucesso na resposta de um item individual', async () => {
    
    sinon.stub(productsService, 'getProductById').resolves(mock[0]);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)

    await productsController.queryAllProducts(req, res)

    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith(mock[0])
  })
  
  it('Testa caso de falha na resposta de um item individual', async () => {
    
    sinon.stub(productsService, 'getProductById').resolves({ message: 'Product not found' });

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)

    await productsController.queryAllProducts(req, res)

    expect(res.status).to.have.been.calledWith(404)
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' })
  })
})