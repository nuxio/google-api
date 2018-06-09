'use strict';

const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const formidable = require('formidable');
const md5File = require('md5-file/promise');

const Controller = require('egg').Controller;
const Qiniu = require('qiniu');
const FileModel = require('../service/File');

class UploadController extends Controller {
  async index() {
    await this.ctx.render('upload/index.tpl');
  }

  async parse(req) {
    const form = new formidable.IncomingForm();
    return new Promise(resolve => {
      form.parse(req, (err, fields, files) => {
        resolve({ fields, files });
      });
    });
  }

  async upload() {
    const { ctx } = this;
    const { files, fields } = await this.parse(ctx.req);
    const file = files[Object.keys(files)[0]];
    const stream = fs.createReadStream(file.path);
    const md5 = await md5File(file.path);

    const existFile = await FileModel.findFileByMd5(md5);
    existFile.labels = JSON.parse(existFile.labels);

    if (existFile) {
      ctx.body = {
        exist: 1,
        file: existFile,
      };
      return;
    }

    const fileName = file.name;
    const target = path.join(this.app.config.baseDir, 'app/public/upload', fileName);
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
    const url = `${this.app.config.baseUrl}public/upload/${fileName}`;

    const savedFile = await FileModel.newFile({
      md5,
      name: fileName,
      size: file.size,
      url,
    }, fields.openId);

    ctx.body = {
      exist: 0,
      file: savedFile,
    };
  }

  async token() {
    const { ACCESS_KEY, SECRET_KEY, BUCKET } = this.app.config.upload;
    const mac = new Qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
    const options = {
      scope: BUCKET,
    };
    const putPolicy = new Qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);

    this.ctx.body = {
      token: uploadToken,
    };
  }
}

module.exports = UploadController;
