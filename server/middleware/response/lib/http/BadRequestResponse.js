/**
 * BadRequestResponse
 * @param errorCode
 * @param moreInfo
 * @constructor
 */
function BadRequestResponse(moreInfo) {
    return {
        error: {
            http_response_code: 400,
            message: 'The server cannot or will not process the request due to an apparent client error',
            moreInfo,
        },
    };
}

module.exports = BadRequestResponse;
