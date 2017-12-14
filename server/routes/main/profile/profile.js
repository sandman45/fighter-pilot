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
        dynamo.get(params, (error, data) => {
            if (error) {
                next({ error });
            } else {
                next(data);
            }
        });
    });

    app.get(apiRoutes.getProfiles, auth.authCheck, (req, res, next) => {
        const dynamo = Dynamo.getDynamo();
        const params = {
            TableName: 'Profile',
        };

        dynamo.scan(params, (error, data) => {
            if (error) {
                next({ error });
            } else {
                next(data.Items);
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
        dynamo.put(params, (error, data) => {
            if (error) {
                next({ error });
            } else {
                next(data);
            }
        });
    });

    const validateUpdateProfile = [
        check('profileId').exists().withMessage('profileId is a required attribute'),
        check('tableName').exists().withMessage('tableName is a required attribute'),
        check('expression').exists().withMessage('expression is a required attribute'),
        check('keys').exists().withMessage('keys is a required attribute'),
        check('values').exists().withMessage('values is a required attribute'),
    ];

    app.put(apiRoutes.updateProfile, auth.authCheck, validateUpdateProfile, validate, (req, res, next) => {
        const dynamo = Dynamo.getDynamo();
        const params = {
            TableName: req.body.tableName,
            Key: {
                ProfileId: req.params.profileId,
            },
            UpdateExpression: req.body.expression,
            ExpressionAttributeNames: req.body.keys,
            ExpressionAttributeValues: req.body.values,
            ReturnValues: 'UPDATED_NEW',
        };
        global.logger.warn(JSON.stringify(params));
        dynamo.update(params, (error, data) => {
            if (error) {
                next({ error });
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
