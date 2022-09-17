const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection')
const productsModel = require('../../../src/models/productsModel');

const { productsMock } = require('./mocks/productsModelMocks');

describe('Testa a camada model da rota products', () => {

    afterEach(sinon.restore);

    it('Verifica GET /products', async () => {
    
      sinon.stub(connection, 'execute').resolves([productsMock]);

      const result = await productsModel.selectAll()

      expect(result).to.be.an('array')
      expect(result).to.have.lengthOf(3)
      expect(result).to.equal(productsMock)
    });

    it('Verifica GET /products/:id', async () => {
      sinon.stub(connection, 'execute').resolves([[productsMock[0]]]);

      const result = await productsModel.selectById(1)
      
      expect(result).to.be.deep.equal(productsMock[0])
      expect(result).to.be.an('object')
      expect(result.id).to.equal(1)
      expect(result.name).to.equal("Martelo de Thor")
    });
});
