# Concrete Solutions - Desafio Node.js

## Overview
API REST in Node.js usando ES6 and Express com Code Coverage e autenticação JWT

## Features

## Local Requirements

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

Deploy:
```
# TODO
```

## Logging
A biblioteca [winston](https://www.npmjs.com/package/winston) é utilizada para log da aplicação. Utilizando 
multiplos transportes por nível de log.

## Docker
```
# Para ambiente de desenvolvimento
# Todos os serviços serão reiniciados ao modificar algum arquivo
1. bash bin/development.sh
```
