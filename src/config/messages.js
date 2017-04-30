/**
 *
 * @type {{}}
 */
module.exports = {
  errors: {
    unAuthorized: 'Acesso não autorizado.',
    apiNotFound: 'Recurso não encontrado.',
    badRequest: 'Erro de validação',
    sequelize: {
      databaseValidationError: 'Erro de validação.',
      databaseError: 'Erro interno.',
      databaseTimeoutError: 'O tempo de conexão expirou.',
      databaseUniqueConstraintError: 'O recurso existente.',
      databaseForeignKeyConstraintError: 'Violação de constraint ao criar recurso.',
      databaseExclusionConstraintError: 'Violação de constaint ao deletar recurso.',
      databaseConnectionError: 'Erro de conexão.',
      databaseInstanceError: 'Erro na instancia do modelo.'
    }
  }
};
