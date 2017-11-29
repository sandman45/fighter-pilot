// put your requires here that you want to run at runtime
const mysql = require('../services/mysql');
const aws = require('../services/aws');

aws.init();
mysql.init();
