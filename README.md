# Concrete Solutions - Desafio Node.js

## Overview
API REST in Node.js usando ES6 and Express com Code Coverage e autenticação JWT

## Endpoints

Aplicação disponibilizada em:
http://dev-cs-desafio-node.sa-east-1.elasticbeanstalk.com/

Routes:

### GET  /api/v1 - Version
Retorna a versão e nome da aplicação

### GET /api/v1/health-check - Health Check
Simples health check da aplicação

### POST /api/v1/user - Cadastro de usuários
Cadastra novos usuários na aplicação

### GET /api/v1/user/:id - Busca de usuário
Recupera um determinado usuário pelo ID

### POST /api/v1/auth/sign_in - Autenticação
Autentica um usuário na aplicação

## Features

* **ECMAScript 6** - Escrita do código fonte.
* **Geração de token de usuário com JsonWebToken** - usando [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* **Code Linting** - Javascript code linting usando [ESLint](http://eslint.org/) para identificar e reportar padrões de 
escrita em Javascript. Utilizando as regras bases de [eslint-contrib-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
* **Reinicialização automática do servidor** - Reinicialização do servidor com [nodemon](https://github.com/remy/nodemon)
* **Debugging via [debug](https://www.npmjs.com/package/debug)** - Apresenta informações de debug quando configurada a 
variável DEBUG na aplicação.
* **Validações de parametros de entrada via [express-validation](https://www.npmjs.com/package/express-validation)** - Valida
body, params, quary, headers e cookies da requisição via middleware.
* **Pre-commit hooks** - Roda as tarefas de lint e tests em cada comit na aplicação.
* **Securança do App via [helmet](https://github.com/helmetjs/helmet)** - Helmet ajuda na segurança de aplicações Express, configurando
diversos HTTP headers e mais...
* **Suporte CORS via [cors](https://github.com/expressjs/cors)** 
* **Utilização de [http-status](https://www.npmjs.com/package/http-status)** - Para configurar os status code da aplicação.
* **.editorconfig** - Para padronização de configurações entre IDEs
* **AWS Beanstalk** - Host para aplicação
* **MySQL com ORM Sequelize**

## Local Requirements

### AWS
* Conta de desenvolvimento em [aws.amazon.com](aws.amazon.com)
* AWS Elastic BeanStalk [elasticbeanstalk](https://aws.amazon.com/pt/elasticbeanstalk/)
* AWS CLI - Instruções de instalação [AWS CLI install](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
* AWS EB CLI - Instruções de instalação [AWS EB CLI install](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html)

### NodeJS
* NodeJS >=6.9 [nodejs](https://nodejs.org/en/)
* NPM >=3

### MySQL
* MySQL server

## Getting Started
Clone o repositório:
```
git clone https://github.com/weberamaral/cs-desafio-node.git
cd cs-desafio-node
```

Instale as dependencias:
```
npm install
```

Configure as variáveis de ambiente:
```
cp .env.example .env
```

Inicie o servidor:
```
# Iniciando o servidor em produção
npm start

# Iniciando o servidor em desenvolvimento
npm run start:development
```

Testes:
```
# Rodando os testes escritos em ES6
npm test

# Rodando os testes junto com a cobertura de testes
npm run test:coverage

# Rodando os testes em modo escuta
npm run test:watch

# Rodando os testes com istanbul (configurado com .istanbul.yml)
npm run test:check-coverage
```

Lint:
```
# Lint do código escrito em ES6
npm run lint

# Lint do código escrito em ES6 em modo escuta
npm run lint:watch
```

Init, Create e Deploy:

A inicialização da aplicação para host no AWS Elastic BeanStalk:

```
eb init cs-desafio-node --region=sa-east-1
```

A criação do ambiente no AWS Elastic BeanStalk:

```
eb create development 
```

Para deploy da aplicação é utilizado a CLI do elastic beanstalk que assume como versionamento o repositório git, 
configurado.

```
eb deploy
```

Este comando faz com que o projeto seja enviado para o Bucket S3 - com versão de acordo com a tag da aplicação.
Os arquivos ignorados para envio ao servidor são informados em `.ebignore`.

As variáveis de ambientes básicas - que podem ser versionadas - são informadas dentro da pasta `.ebextensions`

## Logging
A biblioteca [winston](https://www.npmjs.com/package/winston) é utilizada para log da aplicação. Utilizando 
multiplos transportes por nível de log.
