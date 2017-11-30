
const logger = global.logger;

const cuid = require('../../../utilities/util').cuid;
const auth = require('../../../middleware/security/auth');
const apiRoutes = require('../../routes');
const errors = require('../../../middleware/response/lib/errorIndex');
const S3 = require('../../../services/aws/aws');
const Dynamo = require('../../../services/aws/aws');

module.exports = (app) => {
    app.get(apiRoutes.searchProfile, (req, res, next) => {
        const dynamo = Dynamo.getDynamo();
        const params = {
            TableName: 'Profile',
            Key: {},
        };
        params.Key[req.params.key] = req.params.value;
        dynamo.get(params, (err, data) => {
            if (err) {
                res.status(err.statusCode ? err.statusCode : 500).send(err);
            } else {
                res.send(data);
            }
        });
    });

    app.post(apiRoutes.profile, (req, res, next) => {
        const dynamo = Dynamo.getDynamo();
        const params = {
            TableName: 'Profile',
            Item: req.body,
        };
        params.Item.ProfileId = cuid();
        dynamo.put(params, (err, data) => {
            if (err) {
                res.status(err.statusCode ? err.statusCode : 500).send(err);
            } else {
                res.send(data);
            }
        });
    });

    app.put(apiRoutes.updateProfile, (req, res, next) => {
        const dynamo = Dynamo.getDynamo();
        const params = {
            TableName: 'Profile',
            Key: {
                ProfileId: req.params.profileId,
            },
            UpdateExpression: 'set ranks = :r',
            ExpressionAttributeValues: {
                ':r': ['01', '02'],
            },
            ReturnValues: 'UPDATED_NEW',
        };
        dynamo.update(params, (err, data) => {
            if (err) {
                res.status(err.statusCode ? err.statusCode : 500).send(err);
            } else {
                res.send(data);
            }
        });
    });

    // const s3 = S3.getS3();
    // s3.getObject({
    //     Bucket: 'fighter-pilot-test',
    //     Key: 'sandman.jpg',
    // }, (err, data) => {
    //     if (err) {
    //         res.status(500).send(err);
    //     } else {
    //         logger.info(data);
    //         res.send(data);
    //     }
    // });
};
