/**
 * Module dependencies.
 */
const Chai = require('chai');
const should = require('should');

const expect = Chai.expect;
const securityPassword = require('../../src/helpers/security-password');

Chai.config.includeStack = true;

const defaultPassword = 'password';
const defaultSalt = 'salt';

describe('# SecurityPassword', () => {
  it('Deveria existir', (done) => {
    expect(securityPassword).to.not.equal(null);
    done();
  });
  it('Deveria existir a função saltHashPassword', (done) => {
    expect(securityPassword).to.have.property('saltHashPassword');
    expect(securityPassword.saltHashPassword).to.be.an('function');
    done();
  });
  it('Deveria retornar um hash e salt sem informar o salt', (done) => {
    const saltHash = securityPassword.saltHashPassword(defaultPassword);
    expect(saltHash).to.not.equal(null);
    expect(saltHash).to.have.property('salt');
    saltHash.salt.should.not.be.empty;
    expect(saltHash).to.have.property('hash');
    saltHash.hash.should.not.be.empty;
    done();
  });
  it('Deveria retornar um hash e salt quando informado o salt', (done) => {
    const saltHash = securityPassword.saltHashPassword(defaultPassword, defaultSalt);
    expect(saltHash).to.not.equal(null);
    expect(saltHash).to.have.property('salt');
    saltHash.salt.should.not.be.empty;
    expect(saltHash.salt).to.equal(defaultSalt);
    expect(saltHash).to.have.property('hash');
    saltHash.hash.should.not.be.empty;
    done();
  });
  it('Deveria ser possivel comparar o hash da senha criada pela informada como plainText', (done) => {
    const saltHash = securityPassword.saltHashPassword(defaultPassword);
    (securityPassword.saltHashPassword(defaultPassword, saltHash.salt).hash === saltHash.hash).should.be.true;
    done();
  });
});
