/**
 * Module dependencies.
 */
const HttpStatus = require('http-status');

class ExtendableError extends Error {
  constructor(mensagem, status, errors, isPublic) {
    super(mensagem);
    this.name = this.constructor.name;
    this.mensagem = mensagem;
    this.status = status;
    this.errors = errors;
    this.isPublic = isPublic;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

class APIError extends ExtendableError {
  constructor(mensagem, status = HttpStatus.INTERNAL_SERVER_ERROR, errors = [], isPublic = true) {
    super(mensagem, status, errors, isPublic);
  }
}

module.exports = APIError;
