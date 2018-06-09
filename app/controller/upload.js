'use strict';

const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const formidable = require('formidable');

const Controller = require('egg').Controller;
const Qiniu = require('qiniu');

class UploadController extends Controller {
  async index() {
    // render a template, path relate to `app/view`
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
    const { ctx, logger } = this;
    const extraParams = await this.parse(ctx.req);
    const { multipleFile, customName } = extraParams && extraParams.fields;
    logger.info(multipleFile, customName);
    const urls = [];
    for (const key in extraParams.files) {
      const file = extraParams.files[key];
      logger.info('file.name', file.name);
      logger.info('customName', customName);
      const stream = fs.createReadStream(file.path);
      const fileName = customName ? (customName + path.extname(file.name)) : file.name;
      const target = path.join(this.app.config.baseDir, 'app/public/upload', fileName);
      const writeStream = fs.createWriteStream(target);
      try {
        await awaitWriteStream(stream.pipe(writeStream));
      } catch (err) {
        await sendToWormhole(stream);
        throw err;
      }
      urls.push(`${this.app.config.baseUrl}public/upload/${fileName}`);
    }

    this.ctx.body = {
      urls,
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
