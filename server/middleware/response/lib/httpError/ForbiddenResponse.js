/**
 * Person not allowed to do that action
 * @param errorCode
 * @param moreInfo
 * @constructor
 */
function ForbiddenResponse(errorCode, moreInfo) {
    const response = {
        error: {
            code: errorCode,
            httpResponseHint: 403,
            message: '',
            moreInfo,
        },
    };

    switch (errorCode) {
    case 502:
        response.error.message = 'Forbidden: Not enough privileges to perform the requested operation.';
        break;
    default:
        response.error.message = 'Forbidden: Default error.';
        break;
    }

    return response;
}

module.exports = ForbiddenResponse;
