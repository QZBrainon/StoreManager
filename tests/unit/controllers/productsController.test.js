const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const {productsMock} = require('./mocks/productsControllerMocks')
const productsService = require('../../../src/services/productsServices');
const productsController = require('../../../src/controllers/productsController')

describe('Testa a camada controller', () => {
  
  afterEach(sinon.restore);

  it('Testa caso de sucesso da resposta de todos os itens', async () => {
    
    sinon.stub(productsService, 'getAllProducts').resolves(productsMock);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)

    await productsController.queryAllProducts(req, res)

    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith(productsMock)
  })

  it('Testa caso de sucesso na resposta de um item individual', async () => {
    
    sinon.stub(productsService, 'getProductById').resolves(productsMock[0]);

    const req = {params: { id: 1}};
    const res = {};

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()

    await productsController.queryById(req, res)

    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith(productsMock[0])
  })
  
  it('Testa caso de falha na resposta de um item individual', async () => {
    
    sinon.stub(productsService, 'getProductById').resolves({ message: 'Product not found' });

    const req = {params: { id: 1}};
    const res = {};

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)

    await productsController.queryById(req, res)

    expect(res.status).to.have.been.calledWith(404)
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' })
  })

  it('Testa a function postProduct', async () => {
    const mock = { id: 1, name: 'Martelo de Thor' }
    sinon.stub(productsService, 'postProduct').resolves(mock)
    
    const req = {};
    const res = {};

    req.body = sinon.stub().returns(req)
    res.status = sinon.stub().returns(res)
    res.send = sinon.stub().returns(res)

    await productsController.postProduct(req, res)

    expect(res.status).to.have.been.calledWith(201)
    expect(res.send).to.have.been.calledWith(mock)

  })
})