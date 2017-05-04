/**
 * Module dependencies.
 */
const Request = require('supertest-as-promised');
const HttpStatus = require('http-status');
const Chai = require('chai');
const lodash = require('lodash');
const _ = require('underscore');

const expect = Chai.expect;
const App = require('../../../src/config/express');
const authModule = require('../../../src/controllers/auth/index');

const authRequestMock = {
  email: 'email@email.com',
  senha: '123mudar'
};

const createUserMock = () => {
  return {
    nome: 'Weber Amaral',
    email: `${new Date().getTime()}@email.com`,
    senha: '123mudar',
    telefones: [
      {
        ddd: '11',
        numero: '987651234'
      }
    ]
  };
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
    it('Deveria não permitir outros parametros no payload', (done) => {
      const data = lodash.extend({}, authRequestMock);
      data.other = 'other';
      Request(App)
        .post('/api/v1/auth/sign_in')
        .send(data)
        .expect(HttpStatus.UNPROCESSABLE_ENTITY)
        .then((loginResponse) => {
          expect(loginResponse.body).to.not.equal(null);
          expect(loginResponse.body).to.have.property('mensagem').and.to.equal('Erro de validação de dados');
          const target = _.where(loginResponse.body.errors, { field: 'other' });
          target.should.have.length(1);
          done();
        })
        .catch(done);
    });
    it('Deveria retornar sucesso ao autenticar um usuário', (done) => {
      const user = createUserMock();
      Request(App)
        .post('/api/v1/user')
        .send(user)
        .expect(HttpStatus.CREATED)
        .then((userResponse) => {
          const login = lodash.extend({}, authRequestMock);
          login.email = userResponse.body.email;
          Request(App)
            .post('/api/v1/auth/sign_in')
            .send(login)
            .expect(HttpStatus.OK)
            .then((loginResponse) => {
              expect(loginResponse.body).to.not.equal(null);
              expect(loginResponse.body).to.have.property('id').and.to.equal(userResponse.body.id);
              expect(loginResponse.body).to.have.property('nome').and.to.equal(userResponse.body.nome);
              expect(loginResponse.body).to.have.property('email').and.to.equal(userResponse.body.email);
              expect(loginResponse.body).to.have.property('token').and.to.equal(userResponse.body.token);
              expect(loginResponse.body).to.have.property('data_criacao').and.to.equal(userResponse.body.data_criacao);
              expect(loginResponse.body).to.have.property('data_atualizacao');
              expect(loginResponse.body).to.have.property('ultimo_login');
              done();
            })
            .catch(done);
        })
        .catch(done);
    });
    it('Deveria retornar erro para e-mail incorreto', (done) => {
      const user = createUserMock();
      Request(App)
        .post('/api/v1/user')
        .send(user)
        .expect(HttpStatus.CREATED)
        .then(() => {
          const login = lodash.extend({}, authRequestMock);
          login.email = 'invalid_email@email.com';
          Request(App)
            .post('/api/v1/auth/sign_in')
            .send(login)
            .expect(HttpStatus.UNAUTHORIZED)
            .then((loginResponse) => {
              expect(loginResponse.body).to.not.equal(null);
              expect(loginResponse.body).to.have.property('mensagem').and.to.equal('Usuário e/ou senha inválidos');
              done();
            })
            .catch(done);
        })
        .catch(done);
    });
    it('Deveria retornar erro para senha incorreta', (done) => {
      const user = createUserMock();
      Request(App)
        .post('/api/v1/user')
        .send(user)
        .expect(HttpStatus.CREATED)
        .then((userResponse) => {
          const login = lodash.extend({}, authRequestMock);
          login.email = userResponse.body.email;
          login.senha = 'invalid_password';
          Request(App)
            .post('/api/v1/auth/sign_in')
            .send(login)
            .expect(HttpStatus.UNAUTHORIZED)
            .then((loginResponse) => {
              expect(loginResponse.body).to.not.equal(null);
              expect(loginResponse.body).to.have.property('mensagem').and.to.equal('Usuário e/ou senha inválidos');
              done();
            })
            .catch(done);
        })
        .catch(done);
    });
  });
});
