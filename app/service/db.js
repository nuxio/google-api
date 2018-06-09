'use strict';

const mongoose = require('mongoose');

const uri = 'mongodb+srv://mafee_1:wonderno1@cluster0-kyew5.mongodb.net/album?retryWrites=true';

mongoose.connect(uri,
  {
    poolSize: 2,
    promiseLibrary: global.Promise,
  }
);

module.exports = mongoose;
