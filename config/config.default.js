'use strict';

const path = require('path');

const BASE_URL = '';
const ACCESS_KEY = '';
const SECRET_KEY = '';
const BUCKET = '';

const APP_ID = '';
const SECRET = '';

module.exports = appInfo => {
  const config = exports = {};

  // view engine
  config.view = {
    defaultViewEngine: 'nunjucks',
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1525158088352_5605';

  // add your config here
  config.middleware = [];

  config.baseDir = path.resolve(__dirname, '../');
  config.baseUrl = 'https://mafeewu.com/';

  // upload config
  config.upload = {
    BASE_URL,
    ACCESS_KEY,
    SECRET_KEY,
    BUCKET,
  };

  config.miniProgram = {
    APP_ID,
    SECRET,
  };

  config.logger = {
    dir: '/home/logs/google-api',
  };

  return config;
};
