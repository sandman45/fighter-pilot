const _ = require('lodash');

const httpErrors = require('./lib/errorIndex');
const httpOk = require('./lib/OkIndex');

let config = {};
let logger = {};

/**
 * handleError
 * @param err
 * @returns {*}
 */
const handleError = (err) => {
    let error;
    let status;
    if (_.has(err, 'httpStatus')) {
        status = err.httpStatus;
    } else if (_.has(err, 'httpResponseHint')) {
        status = err.httpResponseHint;
    }
    switch (status) {
    case 400:
        error = new httpErrors.BadRequestResponse(err.code, err.moreInfo);
        break;
    case 401:
        error = new httpErrors.UnauthorizedResponse(err.code, err.moreInfo);
        break;
    case 403:
        error = new httpErrors.ForbiddenResponse(err.code, err.moreInfo);
        break;
    case 404:
        error = new httpErrors.NotFoundResponse(err.code, err.moreInfo);
        break;
    case 405:
        error = new httpErrors.MethodNotAllowedResponse(err.code, err.moreInfo);
        break;
    case 409:
        error = new httpErrors.ConflictResponse(err.code, err.moreInfo);
        break;
    case 500:
        error = new httpErrors.InternalServerErrorResponse(err.code, err.moreInfo);
        break;
    case 503:
        error = new httpErrors.ServiceUnavailableResponse(err.code, err.moreInfo);
        break;
    default:
        error = new httpErrors.BadRequestResponse(err.code, err.moreInfo);
        break;
    }
    return error;
};

/**
 * handleOk
 * @param code
 * @returns {*}
 */
const handleOk = (code) => {
    let response;
    switch (code) {
    case 200:
        response = new httpOk.OkResponse();
        break;
    case 201:
        response = new httpOk.CreatedResponse();
        break;
    case 204:
        response = new httpOk.NoContentResponse();
        break;
    default:
        response = new httpOk.OkResponse();
        break;
    }
    return response;
};

/**
 * defaultLogger
 * @param message
 */
const defaultLogger = {
    info: (requestId, message) => {
        console.log(`[${requestId}] - [default logger]: info - ${message}`);
    },
    error: (requestId, errorObj, message) => {
        console.log(`[${requestId}] - [default logger]: error - ${message} - ${JSON.stringify(errorObj)}`);
    },
    debug: (requestId, message) => {
        console.log(`[${requestId}] - [default logger]: debug - ${message}`);
    },
};

/**
 * writeLog
 * @param requestId
 * @param data
 * @param errorObj
 */
const writeLog = (requestId, data, errorObj) => {
    if (config.useLogger) {
        logger.debug(requestId, `http status code: ${data.httpResponseHint} - data: ${JSON.stringify(data)}`);
        logger.error(requestId, errorObj || {},
            errorObj ? 'there was an error' : `no errorObject - moreInfo: ${JSON.stringify(data.moreInfo)}`);
    }
};

/**
 * checkOtherErrors
 * @param data
 * @returns {InternalServerErrorResponse}
 */
const checkOtherErrors = (data) => {
    const message = data.message;
    let hasError = false;

    const errorArray = [
        Error,
        TypeError,
        EvalError,
        RangeError,
        ReferenceError,
        SyntaxError,
        URIError,
    ];
    _.each(errorArray, (errorType) => {
        if (data instanceof errorType) {
            hasError = true;
        }
    });

    if (!hasError) {
        return data;
    }
    return new httpErrors.InternalServerErrorResponse(0, message);
};
/**
 * responseHandler
 * @param results
 * @param req
 * @param res
 * @param next
 */
const responseHandler = (results, req, res, next) => {
    if (_.has(results, 'error')) {
        const errObj = handleError(results.error);
        writeLog(req.requestId, errObj.error, results.error.errorObj);
        res.status(errObj.error.httpResponseHint).send(errObj);
        // CATCH ALL ERROR
    } else if (_.has(checkOtherErrors(results), 'error')) {
        const errObj = checkOtherErrors(results);
        writeLog(req.requestId, errObj.error, errObj);
        res.status(errObj.error.httpResponseHint).send(errObj);
    } else {
        const resObj = handleOk(results.httpStatus);
        res.status(resObj.httpResponseHint).send(results.results ? results.results : results);
    }
};

/**
 * Response
 */
class Response {
    constructor(_config) {
        config = _config;
        if (config.useLogger) {
            if (config.logger) {
                logger = config.logger;
            } else {
                logger = defaultLogger;
            }
        }
        this.logger = logger;
        this.config = config;
        this.handleError = handleError;
        this.handleOk = handleOk;
        this.defaultLogger = defaultLogger;
        this.writeLog = writeLog;
        this.responseHandler = responseHandler;
    }
}

module.exports = Response;
