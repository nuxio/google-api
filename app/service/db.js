'use strict';

const mongoose = require('mongoose');

const uri = '';

mongoose.connect(uri,
  {
    poolSize: 2,
    promiseLibrary: global.Promise,
  }
);

module.exports = mongoose;
