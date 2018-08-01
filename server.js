
global.Promise = require('bluebird');

const winston = require('winston');
const express = require('express');

const bodyParser = require('body-parser');
const helmet = require('helmet');

const config = require('config');
const middleware = require('./server/middleware');

const Response = middleware.response;
const validator = require('express-validator');

global.logger = winston;
const logger = global.logger;
const app = express();

app.use(express.static('app'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(validator());
app.use(middleware.accessControl);

// routes
require('./server/routes/index')(app);

// init
require('./server/init/initialize');

const response = new Response({
    useLogger: true,
    logger,
});

app.use(response.responseHandler);

app.listen(config.port, (err) => {
    if (err) {
        return logger.info(`error - ${err}`);
    }
    return logger.info(`server running on port: ${config.port}`);
});
