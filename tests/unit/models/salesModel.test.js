const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection')
const salesModel = require('../../../src/models/salesModel');

const { allSalesMock, saleByIdMock } = require('./mocks/salesModelMocks');

describe('Testa a rota /sales', () => {
  beforeEach(sinon.restore);

  it('Testa se a rota /sales retorna todas as sales', async () => {
    sinon.stub(connection, 'execute').resolves([allSalesMock])

    const result = await salesModel.queryAllSalesProducts()

    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(3)
    expect(result).to.equal(allSalesMock)
    expect(result[0].saleId).to.equal(1)
    expect(result[0].productId).to.equal(1)
    expect(result[0].quantity).to.equal(5)
  })
  
  it('Testa se a rota /sales/:id retorna a sale correta', async () => {
    sinon.stub(connection, 'execute').resolves([saleByIdMock])

    const result = await salesModel.querySalesById(1)

    expect(result).to.be.an('array')
    expect(result[0].saleId).to.equal(1)
    expect(result[0].productId).to.equal(1)
    expect(result[0].quantity).to.equal(5)
    expect(result).to.be.deep.equal(saleByIdMock)
  })

  it('Testa a function insertId', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }])
    
    const result = await salesModel.insertSale()

    expect(result).to.equal(1)
  })
})