/**
 * Module dependencies.
 */
const Request = require('supertest-as-promised');
const HttpStatus = require('http-status');
const Chai = require('chai');

const expect = Chai.expect;
const App = require('../../../src/config/express');
const apiModule = require('../../../src/controllers/api/index');
const pkg = require('../../../package.json');

Chai.config.includeStack = true;

describe('# Api', () => {
  describe('## Module index', () => {
    it('Deveria existir', (done) => {
      expect(apiModule).to.not.equal(null);
      done();
    });
    it('Deveria existir a propriedade version e ser uma função', (done) => {
      expect(apiModule).to.have.property('version');
      expect(apiModule.version).to.be.an('function');
      done();
    });
    it('Deveria existir a propriedade healthCheck e ser uma função', (done) => {
      expect(apiModule).to.have.property('healthCheck');
      expect(apiModule.healthCheck).to.be.an('function');
      done();
    });
  });
  describe('## GET /api/v1/health-check', () => {
    it('Deveria retornar OK', (done) => {
      Request(App)
        .get('/api/v1/health-check')
        .expect(HttpStatus.OK)
        .then((res) => {
          expect(res.text).to.equal('OK');
          done();
        })
        .catch(done);
    });
  });
  describe('## GET /api/v1', () => {
    it('Deveria retornar versão e nome da aplicação', (done) => {
      Request(App)
        .get('/api/v1')
        .expect(HttpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('version');
          expect(res.body.name).to.equal(pkg.name);
          expect(res.body.version).to.equal(pkg.version);
          done();
        })
        .catch(done);
    });
  });
});
