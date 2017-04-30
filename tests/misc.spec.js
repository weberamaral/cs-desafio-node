/**
 * Module dependencies.
 */
const Request = require('supertest-as-promised');
const HttpStatus = require('http-status');
const Chai = require('chai');

const expect = Chai.expect;
const App = require('../src/config/express');

Chai.config.includeStack = true;

describe('# Misc', () => {
  describe('## GET /api/v1/404', () => {
    it('should return 404 status', (done) => {
      Request(App)
        .get('/api/v1/404')
        .expect(HttpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.mensagem).to.equal('Recurso não encontrado.');
          done();
        })
        .catch(done);
    });
  });
});
