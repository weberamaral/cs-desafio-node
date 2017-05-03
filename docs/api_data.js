define({ "api": [
  {
    "type": "get",
    "url": "/health-check",
    "title": "Health-Check",
    "version": "0.1.0",
    "name": "HealthCheck",
    "group": "Application",
    "permission": [
      {
        "name": "public"
      }
    ],
    "description": "<p>Simples health-check da aplicação</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "curl -i http://localhost:8080/api/v1/health-check",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "OK",
            "description": "<p>Success message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK",
          "type": "html"
        }
      ]
    },
    "filename": "src/controllers/api/health-check.js",
    "groupTitle": "Application"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Index",
    "version": "0.1.0",
    "name": "Index",
    "group": "Application",
    "permission": [
      {
        "name": "public"
      }
    ],
    "description": "<p>Apresentação da versão e nome da aplicação</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "curl -i http://localhost:8080/api/v1/",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nome da aplicação</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>Versão da aplicação</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"name\": \"cs-desadio-node\",\n  \"version\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/api/version.js",
    "groupTitle": "Application"
  },
  {
    "type": "post",
    "url": "/auth/sign_in",
    "title": "Login",
    "version": "0.1.0",
    "name": "Login",
    "group": "Authentication",
    "permission": [
      {
        "name": "by token"
      }
    ],
    "description": "<p>Autenticação do usuário na API</p>",
    "examples": [
      {
        "title": "Exemplo de uso",
        "content": "curl -i http://localhost:8080/api/v1/auth/sign_in",
        "type": "json"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authentication",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authentication\": \"Bearer eyJhbGciOiJIUzI1N...\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ultimo_login",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data_atualizacao",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data_criacao",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"nome\": \"Weber Amaral\",\n  \"email\": \"email@email.com\",\n  \"ultimo_login\": \"2017-05-03T19:02:32.000Z\",\n  \"data_atualizacao\": \"2017-05-03T19:02:32.000Z\",\n  \"data_criacao\": \"2017-05-03T19:02:32.000Z\",\n  \"token\": \"eyJhbGciOiJIUzI1N....\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserUnAuthorized",
            "description": "<p>Usuário não autorizado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 UnAuthorized\n{\n  \"mensagem\": \"E-mail e/ou senha inexistente\",\n  \"code\": 401\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/auth/login.js",
    "groupTitle": "Authentication"
  }
] });
