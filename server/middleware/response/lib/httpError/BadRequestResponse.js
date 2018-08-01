/**
 * Path is ok but request could not be processed based on the information sent in the request
 * @param errorCode
 * @param moreInfo
 * @constructor
 */
function BadRequestResponse(errorCode, moreInfo) {
    const response = {
        error: {
            code: errorCode,
            httpResponseHint: 400,
            message: '',
            moreInfo,
        },
    };

    switch (errorCode) {
    case 103:
        response.error.message = 'Bad Request: Malformed syntax, the JSON is not valid.';
        break;
    case 102:
        response.error.message = 'Bad Request: Unable to process request.';
        break;
    case 200:
        response.error.message = 'Bad Request: Invalid Parameters Settlement.';
        break;
    case 300:
        response.error.message = 'Bad Request: Invalid Parameters Loans.';
        break;
    case 500:
        response.error.message = 'Bad Request: Invalid Parameters Logistics.';
        break;
    default:
        response.error.message = 'Bad Request: Default error.';
        break;
    }

    return response;
}

module.exports = BadRequestResponse;
