/**
 * Module dependencies.
 */
const Request = require('supertest-as-promised');
const HttpStatus = require('http-status');
const Chai = require('chai');
const _ = require('lodash');

const expect = Chai.expect;
const App = require('../../../src/config/express');
const authModule = require('../../../src/controllers/auth/index');

const authRequestMock = {
  email: 'email@email.com',
  senha: '123mudar'
};

const createUserMock = {
  nome: 'Weber Amaral',
  email: `${new Date().getTime()}@email.com`,
  senha: '123mudar',
  telefones: [
    {
      ddd: '11',
      numero: '998761234'
    }
  ]
};

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
    describe('### HTTP_STATUS 422', () => {
      it('Deveria não permitir outros parametros no payload', (done) => {
        const data = _.extend({}, authRequestMock);
        data.other = 'other';
        Request(App)
          .post('/api/v1/auth/sign_in')
          .send(data)
          .expect(HttpStatus.UNPROCESSABLE_ENTITY)
          .then(() => done())
          .catch(done);
      });
    });
    describe('### HTTP_STATUS 200', () => {
      it('Deveria retornar sucesso', (done) => {
        const user = _.extend({}, createUserMock);
        Request(App)
          .post('/api/v1/user')
          .send(user)
          .expect(HttpStatus.CREATED)
          .then((userResponse) => {
            const login = _.extend({}, authRequestMock);
            login.email = userResponse.body.email;
            Request(App)
              .post('/api/v1/auth/sign_in')
              .send(login)
              .expect(HttpStatus.OK)
              .then(() => done())
              .catch(done);
          })
          .catch(done);
      });
    });
    describe('### HTTP_STATUS 401', () => {
      it('Deveria retornar erro para e-mail incorreto', (done) => {
        const user = _.extend({}, createUserMock);
        Request(App)
          .post('/api/v1/user')
          .send(user)
          .expect(HttpStatus.CREATED)
          .then(() => {
            const login = _.extend({}, authRequestMock);
            login.email = 'invalid_email@email.com';
            Request(App)
              .post('/api/v1/auth/sign_in')
              .send(login)
              .expect(HttpStatus.UNAUTHORIZED)
              .then(() => done())
              .catch(done);
          })
          .catch(done);
      });
      it('Deveria retornar erro para senha incorreta', (done) => {
        const user = _.extend({}, createUserMock);
        Request(App)
          .post('/api/v1/user')
          .send(user)
          .expect(HttpStatus.CREATED)
          .then((userResponse) => {
            const login = _.extend({}, authRequestMock);
            login.email = userResponse.body.email;
            login.senha = 'invalid_password';
            Request(App)
              .post('/api/v1/auth/sign_in')
              .send(login)
              .expect(HttpStatus.UNAUTHORIZED)
              .then(() => done())
              .catch(done);
          })
          .catch(done);
      });
    });
  });
});
