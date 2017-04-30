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
    it('Should exist', (done) => {
      expect(apiModule).to.not.equal(null);
      done();
    });
  });
  describe('## GET /api/v1/health-check', () => {
    it('should return OK', (done) => {
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
    it('Should return version and name application', (done) => {
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
