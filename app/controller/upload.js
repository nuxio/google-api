'use strict';

const Controller = require('egg').Controller;
const Qiniu = require('qiniu');

class UploadController extends Controller {
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
