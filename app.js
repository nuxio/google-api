'use strict';

const path = require('path');
// app.js
module.exports = app => {
  app.beforeStart(async () => {
    const file = path.resolve(__dirname, 'api-key.json');
    process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(__dirname, file);
  });
};
