const { check } = require('express-validator/check');

const validate = require('../../../middleware/validator/validate');
const cuid = require('../../../utilities/util').cuid;
const auth = require('../../../middleware/security/auth');
const apiRoutes = require('../../routes');
// const errors = require('../../../middleware/response/lib/errorIndex');
const Dynamo = require('../../../services/aws/aws');

// const S3 = require('../../../services/aws/aws');

module.exports = (app) => {
    const validateSearchProfile = [
        check('key').exists().withMessage('key is a required attribute'),
        check('value').exists().withMessage('value is required'),
    ];

    app.get(apiRoutes.searchProfile, auth.authCheck, validateSearchProfile, validate, (req, res, next) => {
        const dynamo = Dynamo.getDynamo();
        const params = {
            TableName: 'Profile',
            Key: {},
        };
        params.Key[req.params.key] = req.params.value;
        dynamo.get(params, (err, data) => {
            if (err) {
                next(err);
            } else {
                next(data);
            }
        });
    });

    const validateProfile = [
        check('name').exists().withMessage('name is a required attribute'),
        check('serviceBranch').exists().withMessage('serviceBranch is required'),
        check('awards').exists().withMessage('awards is required'),
        check('ranks').exists().withMessage('ranks is required'),
        check('photos').exists().withMessage('photos is required'),
    ];

    app.post(apiRoutes.profile, auth.authCheck, validateProfile, validate, (req, res, next) => {
        const dynamo = Dynamo.getDynamo();
        const params = {
            TableName: 'Profile',
            Item: req.body,
        };
        params.Item.ProfileId = cuid();
        dynamo.put(params, (err, data) => {
            if (err) {
                next(err);
            } else {
                next(data);
            }
        });
    });

    const validateUpdateProfile = [
        check('profileId').exists().withMessage('profileId is a required attribute'),
    ];

    app.put(apiRoutes.updateProfile, auth.authCheck, validateUpdateProfile, validate, (req, res, next) => {
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
                next(err);
            } else {
                next(data);
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
