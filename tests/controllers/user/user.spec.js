/**
 * Module dependencies.
 */
const Request = require('supertest-as-promised');
const HttpStatus = require('http-status');
const Chai = require('chai');

const expect = Chai.expect;
const App = require('../../../src/config/express');
const userModule = require('../../../src/controllers/user/index');

Chai.config.includeStack = true;

describe('# User', () => {
  describe('## Module User', () => {
    it('Deveria existir', (done) => {
      expect(userModule).to.not.equal(null);
      done();
    });
    it('Deveria existir a propriedade get e ser uma função', (done) => {
      expect(userModule).to.have.property('get');
      expect(userModule.get).to.be.an('function');
      done();
    });
    it('Deveria existir a propriedade create e ser uma função', (done) => {
      expect(userModule).to.have.property('create');
      expect(userModule.create).to.be.an('function');
      done();
    });
  });
});
