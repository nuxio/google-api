'use strict';

const ACCESS_KEY = '9Ko2RJqB3DEUZEIurrxo9X6AFjOMzJqrtAA97uXZ';
const SECRET_KEY = 'Z8wyiwCMekV8hF9ch7GylbYb1667oZCA0Tkrqf1d';
const BUCKET = 'lwer';

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
    ACCESS_KEY,
    SECRET_KEY,
    BUCKET,
  };

  return config;
};
