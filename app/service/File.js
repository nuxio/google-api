'use strict';

const connect = require('./db');
const Schema = connect.Schema;

const FileSchema = new Schema({
  md5: {
    type: String,
  },
  name: {
    type: String,
  },
  size: {
    type: String,
  },
  url: {
    type: String,
  },
  labels: {
    type: String,
  },
  createTime: {
    type: Number,
  },
  creatorOpenId: {
    type: String,
  },
});

const File = connect.model('File', FileSchema);

exports.newFile = function(fileInfo, openId) {
  let file = new File();
  fileInfo.createTime = new Date().getTime();
  fileInfo.creatorOpenId = openId;
  file = Object.assign(file, fileInfo);
  return file.save();
};

exports.findFileByMd5 = function(md5) {
  return File.findOne({ md5 }).lean().exec();
};

exports.updateLabelByMd5 = function(md5, labels) {
  return File.update({ md5 }, { labels: JSON.stringify(labels) }).lean().exec();
};
