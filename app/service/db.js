'use strict';

const mongoose = require('mongoose');

const uri = 'mongodb+srv://mafee_1:wonderno1@cluster0-kyew5.mongodb.net/album?retryWrites=true';

mongoose.connect(uri, {
  server: {
    auto_reconnect: true,
    poolSize: 20,
  },
}, function(err) {
  if (err) {
    console.error(err.stack);
  }
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
