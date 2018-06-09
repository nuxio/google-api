'use strict';

const connect = require('./db');
const Schema = connect.Schema;

const UserSchema = new Schema({
  openId: {
    type: String,
  },
  nickName: {
    type: String,
  },
  gender: {
    type: String,
  },
  city: {
    type: String,
  },
  province: {
    type: String,
  },
  country: {
    type: String,
  },
  avatarUrl: {
    type: String,
  },
  createTime: {
    type: String,
  },
  latestTime: {
    type: String,
  },
});

const User = connect.model('User', UserSchema);

exports.register = function(userInfo) {
  let user = new User();
  userInfo.createTime = new Date().getTime();
  user = Object.assign(user, userInfo);
  return user.save();
};

exports.findByOpenId = function(openId) {
  return User.findOne({ openId }).lean().exec();
};

exports.updateLatestTime = function(openId) {
  const time = new Date().getTime();
  return User.update({ openId }, { latestTime: time }).lean().exec();
};
