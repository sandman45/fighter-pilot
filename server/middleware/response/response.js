const _ = require('lodash');

module.exports = function (results, req, res, next) {
    if (_.has(results, 'error')) {
        res.status(results.error.statusCode).send(JSON.stringify(results));
    } else {
        res.status(200).send(JSON.stringify(results));
    }
};

