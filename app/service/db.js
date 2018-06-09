'use strict';

const mongoose = require('mongoose');

const uri = '';

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
