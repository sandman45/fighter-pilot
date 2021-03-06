/**
 * Server side error
 * @param errorCode
 * @param moreInfo
 * @constructor
 */
function InternalServerErrorResponse(errorCode, moreInfo) {
    const response = {
        error: {
            code: errorCode,
            httpResponseHint: 500,
            message: '',
            moreInfo,

        },
    };

    switch (errorCode) {
    case 105:
        response.error.message = 'Internal Server Error: Unexpected condition.';
        break;
    default:
        response.error.message = 'Internal Server Error: Default error.';
        break;
    }

    return response;
}

module.exports = InternalServerErrorResponse;
