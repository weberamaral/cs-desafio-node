/**
 * Module dependencies.
 */
const Joi = require('joi');
const HttpStatus = require('http-status');

module.exports = {
  // params-validation for auth routes
  auth: {
    login: {
      body: {
        email: Joi.string().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required()
          .options({
            language: {
              any: {
                empty: '!!Não deve ser vazio',
                required: '!!Deve ser informado'
              },
              string: {
                regex: {
                  base: '!!Inválido'
                }
              }
            }
          }),
        senha: Joi.string().required().options({
          language: {
            any: {
              required: '!!Deve ser informada',
              empty: '!!Não deve ser vazio'
            }
          }
        })
      }
    }
  },
  // params-validation for user routes
  user: {
    create: {
      body: {
        nome: Joi.string().min(1).max(64).required()
          .options({
            language: {
              any: {
                empty: '!!Não deve ser vazio',
                required: '!!Deve ser informado'
              },
              string: {
                min: '!!Deve possuir ao menos 1 caracter',
                max: '!!Deve possuir no máximo 64 caracteres'
              }
            }
          }),
        email: Joi.string().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required()
          .options({
            language: {
              any: {
                empty: '!!Não deve ser vazio',
                required: '!!Deve ser informado'
              },
              string: {
                regex: {
                  base: '!!Inválido'
                }
              }
            }
          }),
        senha: Joi.string().required()
          .options({
            language: {
              any: {
                required: '!!Deve ser informada',
                empty: '!!Não deve ser vazio'
              }
            }
          }),
        telefones: Joi.array().min(1).required()
          .options({
            language: {
              any: {
                required: '!!Deve ser informado'
              },
              array: {
                base: '!!Deve ser um array',
                min: '!!Deve possuir ao menos 1 telefone'
              }
            }
          })
          .items({
            ddd: Joi.string().regex(/^[0-9]{2}$/).required().options({
              language: {
                any: {
                  required: '!!Deve ser informado',
                  empty: '!!Não deve ser vazio'
                },
                string: {
                  base: '!!Deve ser um número',
                  regex: {
                    base: '!!Inválido'
                  }
                }
              }
            }),
            numero: Joi.string().regex(/^[0-9]{8,9}$/).required().options({
              language: {
                any: {
                  required: '!!Deve ser informado',
                  empty: '!!Não deve ser vazio'
                },
                string: {
                  base: '!!Deve ser uma string',
                  regex: {
                    base: '!!Informe um número de telefone válido. (celular ou fixo)'
                  }
                }
              }
            })
          })
      },
      options: {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        allowUnknownBody: false,
        allowUnknownHeaders: false,
        allowUnknownQuery: false,
        allowUnknownParams: false,
        allowUnknownCookies: false
      }
    },
    get: {
      params: {
        id: Joi.string().required()
      },
      headers: {
        authorization: Joi.string().regex(/Bearer\s(\S+)/).required()
      },
      options: {
        status: HttpStatus.UNAUTHORIZED,
        allowUnknownBody: false,
        allowUnknownHeaders: true,
        allowUnknownQuery: false,
        allowUnknownParams: false,
        allowUnknownCookies: false
      }
    }
  }
};
