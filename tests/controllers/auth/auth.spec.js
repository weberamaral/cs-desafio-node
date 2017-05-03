/**
 * Module dependencies.
 */
const Request = require('supertest-as-promised');
const HttpStatus = require('http-status');
const Chai = require('chai');

const expect = Chai.expect;
const App = require('../../../src/config/express');
const authModule = require('../../../src/controllers/auth/index');

Chai.config.includeStack = true;

describe('# Auth', () => {
  describe('## Module Auth', () => {
    it('Deveria existir', (done) => {
      expect(authModule).to.not.equal(null);
      done();
    });
    it('Deveria existir a propriedade login e ser uma função', (done) => {
      expect(authModule).to.have.property('login');
      expect(authModule.login).to.be.an('function');
      done();
    });
  });
  describe('## POST /api/v1/auth/sign_in', () => {
    it('Deveria aceitar apenas email e senha no payload', (done) => {
      done();
    });
    it('Deveria retornar o usuário se autenticado com sucesso', (done) => {
      done();
    });
    it('Deveria retornar erro (HTTP_STATUS=401) caso o e-mail não exista na base', (done) => {
      done();
    });
    it('Deveria retornar erro (HTTP_STATUS=401) caso a senha não bata com a da base', (done) => {
      done();
    });
  });
});
