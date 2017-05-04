/**
 * Module dependencies.
 */
const Request = require('supertest-as-promised');
const HttpStatus = require('http-status');
const Chai = require('chai');
const Moment = require('moment');

const expect = Chai.expect;
const App = require('../../../src/config/express');
const userModule = require('../../../src/controllers/user/index');
const models = require('../../../src/config/sequelize');

Chai.config.includeStack = true;

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
    describe('## POST /api/v1/user', () => {
      it('Deveria persistir um novo usuário com sucesso', (done) => {
        const user = createUserMock();
        Request(App)
          .post('/api/v1/user')
          .send(user)
          .expect(HttpStatus.CREATED)
          .then((userResponse) => {
            expect(userResponse.body).to.not.equal(null);
            expect(userResponse.body).to.have.property('id');
            expect(userResponse.body).to.have.property('nome').and.to.equal(user.nome);
            expect(userResponse.body).to.have.property('email').and.to.equal(user.email);
            expect(userResponse.body).to.have.property('data_atualizacao');
            expect(userResponse.body).to.have.property('data_criacao');
            expect(userResponse.body).to.have.property('ultimo_login');
            expect(userResponse.body).to.have.property('token');
            expect(userResponse.body).to.not.have.property('senha');
            done();
          })
          .catch(done);
      });
      it('Deveria retornar erro para cadastro de usuário existente', (done) => {
        const user = createUserMock();
        Request(App)
          .post('/api/v1/user')
          .send(user)
          .expect(HttpStatus.CREATED)
          .then((userResponse) => {
            expect(userResponse.body).to.not.equal(null);
            Request(App)
              .post('/api/v1/user')
              .send(user)
              .expect(HttpStatus.CONFLICT)
              .then((userErrorResponse) => {
                expect(userErrorResponse.body).to.not.equal(null);
                expect(userErrorResponse.body).to.have.property('mensagem').and.to.equal('E-mail já existente');
                done();
              })
              .catch(done);
          })
          .catch(done);
      });
      it('Deveria retornar o token do usuário após cadastro com sucesso', (done) => {
        const user = createUserMock();
        Request(App)
          .post('/api/v1/user')
          .send(user)
          .expect(HttpStatus.CREATED)
          .then((userResponse) => {
            expect(userResponse.body).to.not.equal(null);
            expect(userResponse.body).to.have.property('token').and.to.not.equal('');
            done();
          })
          .catch(done);
      });
    });
    describe('## GET /api/user/:id', () => {
      it('Deveria retornar erro em caso de ausencia do header Authorization', (done) => {
        const user = createUserMock();
        Request(App)
          .post('/api/v1/user')
          .send(user)
          .expect(HttpStatus.CREATED)
          .then((userCreateResponse) => {
            expect(userCreateResponse.body).to.not.equal(null);
            Request(App)
              .get(`/api/v1/user/${userCreateResponse.body.id}`)
              .expect(HttpStatus.UNAUTHORIZED)
              .then((userGetErrorResponse) => {
                expect(userGetErrorResponse.body).to.not.equal(null);
                expect(userGetErrorResponse.body).to.have.property('mensagem').and.to.equal('Não autorizado');
                done();
              })
              .catch(done);
          })
          .catch(done);
      });
      it('Deveria retornar erro caso o token seja diferente do modelo', (done) => {
        const user = createUserMock();
        Request(App)
          .post('/api/v1/user')
          .send(user)
          .expect(HttpStatus.CREATED)
          .then((userCreateResponse) => {
            expect(userCreateResponse.body).to.not.equal(null);
            Request(App)
              .get(`/api/v1/user/${userCreateResponse.body.id}`)
              .set('Authorization', 'invalid_token')
              .expect(HttpStatus.UNAUTHORIZED)
              .then((userGetErrorResponse) => {
                expect(userGetErrorResponse.body).to.not.equal(null);
                expect(userGetErrorResponse.body).to.have.property('mensagem').and.to.equal('Não autorizado');
                done();
              })
              .catch(done);
          })
          .catch(done);
      });
      it('Deveria retornar error caso o ultimo_login seja maior que 30 minutos', (done) => {
        const user = createUserMock();
        Request(App)
          .post('/api/v1/user')
          .send(user)
          .expect(HttpStatus.CREATED)
          .then((userCreateResponse) => {
            expect(userCreateResponse.body).to.not.equal(null);
            models.User.findById(userCreateResponse.body.id)
              .then((model) => {
                model.update({ ultimo_login: Moment(userCreateResponse.body.ultimo_login).subtract(31, 'minutes') })
                  .then(() => {
                    Request(App)
                      .get(`/api/v1/user/${userCreateResponse.body.id}`)
                      .set('Authorization', `Bearer ${userCreateResponse.body.token}`)
                      .expect(HttpStatus.UNAUTHORIZED)
                      .then((userGetErrorResponse) => {
                        expect(userGetErrorResponse.body).to.not.equal(null);
                        expect(userGetErrorResponse.body).to.have.property('mensagem').and.to.equal('Sessão inválida');
                        done();
                      })
                      .catch(done);
                  })
                  .catch(done);
              })
              .catch(done);
          })
          .catch(done);
      });
      it('Deveria retornar o usuário em caso de sucesso', (done) => {
        const user = createUserMock();
        Request(App)
          .post('/api/v1/user')
          .send(user)
          .expect(HttpStatus.CREATED)
          .then((userCreateResponse) => {
            expect(userCreateResponse.body).to.not.equal(null);
            Request(App)
              .get(`/api/v1/user/${userCreateResponse.body.id}`)
              .set('Authorization', `Bearer ${userCreateResponse.body.token}`)
              .expect(HttpStatus.OK)
              .then((userGetResponse) => {
                expect(userGetResponse.body).to.not.equal(null);
                expect(userGetResponse.body).to.have.property('id').and.to.equal(userCreateResponse.body.id);
                expect(userGetResponse.body).to.have.property('nome').and.to.equal(userCreateResponse.body.nome);
                expect(userGetResponse.body).to.have.property('email').and.to.equal(userCreateResponse.body.email);
                expect(userGetResponse.body).to.have.property('token').and.to.equal(userCreateResponse.body.token);
                expect(userGetResponse.body).to.have.property('data_criacao').and.to.equal(userCreateResponse.body.data_criacao);
                expect(userGetResponse.body).to.not.have.property('senha');
                done();
              })
              .catch(done);
          })
          .catch(done);
      });
    });
  });
});
