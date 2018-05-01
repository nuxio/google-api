'use strict';

const Controller = require('egg').Controller;
const vision = require('@google-cloud/vision');

class GoogleController extends Controller {
  async index() {
    this.ctx.body = 'Google ctx';
  }

  async labelDetection() {
    const ctx = this.ctx;
    const { key } = this.ctx.query;
    if (!key) {
      this.ctx.body = {
        error: 'key is required!',
      };

      return;
    }

    const { BASE_URL } = this.app.config.upload;
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    const result = await client.labelDetection(BASE_URL + key);

    ctx.body = result;
  }
}

module.exports = GoogleController;
