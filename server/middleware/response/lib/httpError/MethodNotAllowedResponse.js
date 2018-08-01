/**
 * Unable to apply the HTTP method requested
 * @param errorCode
 * @param moreInfo
 * @constructor
 */
function MethodNotAllowedResponse(errorCode, moreInfo) {
    const response = {
        error: {
            code: errorCode,
            httpResponseHint: 405,
            message: '',
            moreInfo,
        },
    };

    switch (errorCode) {
    case 503:
        response.error.message = 'Method Not Allowed: The resource cannot perform the requested operation.';
        break;
    default:
        response.error.message = 'Method Not Allowed: Default error.';
        break;
    }

    return response;
}

module.exports = MethodNotAllowedResponse;
