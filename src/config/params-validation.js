/**
 * Module dependencies.
 */
const Joi = require('joi');
const HttpStatus = require('http-status');

module.exports = {
  /**
   * Default validations
   */
  defaults: {
    id: {
      params: {
        id: Joi.string().required()
      }
    }
  },
  user: {
    create: {
      body: {
        nome: Joi.string().min(1).max(64).required().options({
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
        email: Joi.string().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required().options({
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
        }),
        telefones: Joi.array().min(1).required().options({
          language: {
            any: {
              required: '!!Deve ser informado'
            },
            array: {
              base: '!!Deve ser um array',
              min: '!!Deve possuir ao menos 1 telefone'
            }
          }
        }).items({
          ddd: Joi.number().min(1).max(99).required().options({
            language: {
              any: {
                required: '!!Deve ser informado',
                empty: '!!Não deve ser vazio'
              },
              number: {
                base: '!!Deve ser um número',
                min: '!!Deve possuir ao menos 2 caracteres',
                max: '!!Deve possuir no máximo 2 caracteres'
              }
            }
          }),
          numero: Joi.number().min(10000000).max(999999999).positive().required().options({
            language: {
              any: {
                required: '!!Deve ser informado',
                empty: '!!Não deve ser vazio'
              },
              number: {
                base: '!!Deve ser um número',
                min: '!!Deve possuir ao menos 9 caracteres',
                max: '!!Deve possuir no máximo 9 caracteres',
                positive: '!!Deve ser um número positivo'
              }
            }
          })
        })
      }
    },
    get: {
      params: {
        id: Joi.string().required()
      },
      headers: {
        Authentication: Joi.string().required()
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
