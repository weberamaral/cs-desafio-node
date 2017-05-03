/**
 * Module dependencies.
 */
const Express = require('express');
const Compression = require('compression');
const Logger = require('morgan');
const BodyParser = require('body-parser');
const MethodOverride = require('method-override');
const Cors = require('cors');
const Helmet = require('helmet');
const ExpressWinston = require('express-winston');
const ExpressValidation = require('express-validation');

const config = require('./config');
const winstonInstance = require('./winston');
const errorHandler = require('../middlewares/error-handler.middleware');
const apiErrorHandler = require('../middlewares/api-error.middleware');
const notFoundErrorHandler = require('../middlewares/not-found-error.middleware');
const apiRoutes = require('../routes/api.route');
const authRoutes = require('../routes/auth.route');
const userRoutes = require('../routes/user.route');

const internals = {};
/**
 * Configure application routes
 */
internals.configureRoutes = (app) => {
  app.use('/api', apiRoutes);
  app.use('/api', authRoutes);
  app.use('/api', userRoutes);
  app.get('/favicon.ico', (req, res) => res.send(204)); // Prevent 404 route for favicon.ico
};
/**
 * Configure application logging
 * @param app
 */
internals.configureLogging = (app) => {
  ExpressWinston.requestWhitelist.push('body');
  ExpressWinston.responseWhitelist.push('body');
  app.use(ExpressWinston.logger({
    winstonInstance,
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true
  }));
};

/**
 * Represents a main app class.
 */
class App {
  constructor() {
    this.app = Express();

    if (config.env === 'development') {
      this.app.use(Logger('dev'));
    }

    this.configure();
  }

  configure() {
    // parse body params and attache them to req.body
    this.app.use(BodyParser.json());
    this.app.use(BodyParser.urlencoded({ extended: true }));

    // Other options
    this.app.use(Compression());
    this.app.use(MethodOverride());

    // secure apps by setting various HTTP headers
    this.app.use(Helmet());

    // enable CORS - Cross Origin Resource Sharing
    this.app.use(Cors());

    // options for express-validation params
    ExpressValidation.options({
      allowUnknownBody: false,
      allowUnknownHeaders: false,
      allowUnknownQuery: false,
      allowUnknownParams: false,
      allowUnknownCookies: false
    });

    // enable detailed API logging
    internals.configureLogging(this.app);

    // Configure routes
    internals.configureRoutes(this.app);

    // if error is not an instanceOf APIError, convert it.
    this.app.use(apiErrorHandler());

    // catch 404 and forward to error handler
    this.app.use(notFoundErrorHandler());

    // log error in winston transports except when executing test suite
    if (config.env !== 'test') {
      this.app.use(ExpressWinston.errorLogger({
        winstonInstance
      }));
    }

    // error handler, send stacktrace only during development
    this.app.use(errorHandler());
  }
}

module.exports = new App().app;
