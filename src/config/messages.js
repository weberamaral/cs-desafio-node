/**
 *
 * @type {{}}
 */
module.exports = {
  errors: {
    unAuthorized: 'Não autorizado',
    apiNotFound: 'Recurso não encontrado.',
    badRequest: 'Erro de validação',
    sessionTimeout: 'Sessão inválida',
    sequelize: {
      databaseValidationError: 'Erro de validação.',
      databaseError: 'Erro interno.',
      databaseTimeoutError: 'O tempo de conexão expirou.',
      databaseUniqueConstraintError: 'O recurso existente.',
      databaseForeignKeyConstraintError: 'Violação de constraint ao criar recurso.',
      databaseExclusionConstraintError: 'Violação de constaint ao deletar recurso.',
      databaseConnectionError: 'Erro de conexão.',
      databaseInstanceError: 'Erro na instancia do modelo.'
    },
    auth: {
      login: {
        notFound: 'Usuário e/ou senha inválidos'
      }
    },
    user: {
      create: {
        email: 'E-mail já existente'
      },
      get: {
        notFound: 'Usuário não encontrado'
      }
    }
  }
};
