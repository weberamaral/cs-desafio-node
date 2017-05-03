/**
 * Module dependencies.
 */
const Chai = require('chai');
const HttpStatus = require('http-status');

const expect = Chai.expect;
const APIError = require('../../src/helpers/api-error');

Chai.config.includeStack = true;

describe('# APIError', () => {
  it('Deveria existir', (done) => {
    const apiError = new APIError('Sample message error');
    expect(apiError).to.not.equal(null);
    done();
  });
  it('Deveria existir a propriedade mensagem', (done) => {
    const apiError = new APIError('Sample message error');
    expect(apiError.mensagem).to.not.equal(null);
    expect(apiError.mensagem).to.equal('Sample message error');
    done();
  });
  it('Deveria retornar um HTTP_STATUS padrão', (done) => {
    const apiError = new APIError('Sample message error');
    expect(apiError.status).to.not.equal(null);
    expect(apiError.status).to.equal(HttpStatus.INTERNAL_SERVER_ERROR);
    done();
  });
  it('Deveria retornar HTTO_STATUS 404 na propriedade status', (done) => {
    const apiError = new APIError('Sample message error', HttpStatus.NOT_FOUND);
    expect(apiError.status).to.not.equal(null);
    expect(apiError.status).to.equal(HttpStatus.NOT_FOUND);
    done();
  });
});
