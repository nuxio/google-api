'use strict';

const BASE_URL = '';
const ACCESS_KEY = '';
const SECRET_KEY = '';
const BUCKET = '';

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

  // upload config
  config.upload = {
    BASE_URL,
    ACCESS_KEY,
    SECRET_KEY,
    BUCKET,
  };

  return config;
};
