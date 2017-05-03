/**
 * Module dependencies.
 */
const Path = require('path');
const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().allow(['development', 'test', 'production', 'provision']).default('development'),
  PORT: Joi.number().default(8080),
  TZ: Joi.string().default('UTC'),
  AWS_REGION: Joi.string().default('sa-east-1'),
  DB_HOSTNAME: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(3306),
  DB_USERNAME: Joi.string(),
  DB_PASSWORD: Joi.string(),
  DB_NAME: Joi.string().default('msv_budgets_local'),
  SEQUELIZE_FORCE_SYNC: Joi.boolean().default(false),
  SEQUELIZE_ENABLE_LOG: Joi.boolean().default(false),
  JWT_SECRET: Joi.string(),
  EXPIRE_LOGIN: Joi.number().default(30)
}).unknown().required();

const { error, value: enVars } = Joi.validate(process.env, envVarsSchema);

const rootPath = Path.normalize(`${__dirname}/..`);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: enVars.NODE_ENV,
  port: enVars.PORT,
  tz: enVars.TZ,
  db: {
    name: enVars.DB_NAME,
    host: enVars.DB_HOSTNAME,
    port: enVars.DB_PORT,
    username: enVars.DB_USERNAME,
    password: enVars.DB_PASSWORD
  },
  sequelize: {
    forceDbSync: enVars.SEQUELIZE_FORCE_SYNC,
    enableSequelizeLog: enVars.SEQUELIZE_ENABLE_LOG,
    models: `${rootPath}/models`
  },
  aws: {
    region: enVars.AWS_REGION
  },
  security: {
    jwt: enVars.JWT_SECRET,
    expireLogin: enVars.EXPIRE_LOGIN
  }
};
