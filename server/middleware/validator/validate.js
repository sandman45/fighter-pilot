const { validationResult } = require('express-validator/check');

const errors = require('../../middleware/response/lib/errorIndex');

module.exports = (req, res, next) => {
    const validationRes = validationResult(req);
    if (!validationRes.isEmpty()) {
        const errObj = errors.BadRequestResponse('Validation on fields failed.');
        errObj.error.moreInfo = validationRes.mapped();
        global.logger.info(errObj);
        res.status(errObj.error.http_response_code).send(errObj);
    } else {
        next();
    }
};
