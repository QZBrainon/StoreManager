const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/productsModel')
const productsService = require('../../../src/services/productsServices');

const { productsMock } = require('./mocks/productsServiceMocks');

describe('Testa a camada service da rota products', () => {

  describe('Testa a chamada da rota products na camada service', () => {
    afterEach(sinon.restore);

    it('Verifica a function getAllProducts', async () => {
    
      sinon.stub(productsModel, 'selectAll').resolves(productsMock);

      const result = await productsService.getAllProducts()

      expect(result).to.be.an('array')
      expect(result).to.have.lengthOf(3)
      expect(result).to.deep.equal(productsMock)
    });

    it('Verifica a function getProductById', async () => {
      
      sinon.stub(productsModel, 'selectById').resolves(productsMock[0]);

      const result = await productsService.getProductById(1)
      
      expect(result).to.be.deep.equal(productsMock[0])
      expect(result).to.be.an('object')
      expect(result.id).to.equal(1)
      expect(result.name).to.equal("Martelo de Thor")
    });

    it('Verifica id inexistente', async () => {
      sinon.stub(productsModel, 'selectById').resolves({ message: "Product not found" });
      
      const result = await productsService.getProductById(9999)

      expect(result).to.be.an('object')
      expect(result).to.deep.equal({message: "Product not found"})
    })

  });
});