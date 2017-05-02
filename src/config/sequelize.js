/**
 * Module dependencies
 */
const FS = require('fs');
const Path = require('path');
const Sequelize = require('sequelize');
const Winston = require('winston');
const _ = require('lodash');

const config = require('./config');

const internals = {};

const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: 'mysql',
  timezone: '-03:00',
  logging: config.sequelize.enableSequelizeLog && config.env === 'development' ? Winston.info : false
});

FS.readdirSync(config.sequelize.models)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(Path.join(config.sequelize.models, file));
    internals[model.name] = model;
  });

Object.keys(internals).forEach((modelName) => {
  if ('associate' in internals[modelName]) { // eslint-disable-line no-prototype-builtins
    internals[modelName].associate(internals);
  }
});

module.exports = _.extend({ sequelize, Sequelize }, internals);
