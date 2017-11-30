
const AWS = require('aws-sdk');

const logger = global.logger;

const config = require('config');

let s3 = null;
let dynamoDb = null;

/**
 * init
 */
module.exports.init = () => {
    logger.info('[AWS] init --> Initializing AWS S3 connection');
    AWS.config.update({
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    });

    s3 = new AWS.S3();
};

/**
 * getS3
 * returns the AWS S3 connection and returns it to the calling function.
 * If the connection is undefined or null re-initializes the connection.
 * @returns {*}
 */
module.exports.getS3 = function () {
    if (s3 === undefined || s3 === null) {
        logger.info('[AWS] getS3 --> AWS S3 was undefined or null. Re-initializing AWS S3 connection.');

        AWS.config.update({
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
        });

        s3 = new AWS.S3();

        return s3;
    }
    return s3;
};

/**
 * getDynamo
 * @returns {*}
 */
module.exports.getDynamo = () => {
    if (dynamoDb === undefined || dynamoDb === null) {
        AWS.config.update({
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
            region: 'us-east-1',
        });
        dynamoDb = new AWS.DynamoDB.DocumentClient();
    }
    return dynamoDb;
};

