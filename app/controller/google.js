'use strict';

const Controller = require('egg').Controller;
const Vision = require('@google-cloud/vision');
const Translate = require('@google-cloud/translate');

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
    const visionClient = new Vision.ImageAnnotatorClient();
    const result = await visionClient.labelDetection(BASE_URL + key);
    const labels = result.labelAnnotations.map(item => {
      const { description, score } = item;

      return {
        description,
        score: Math.round(score * 1000) / 10,
      };
    });
    const translateClient = new Translate();
    const translations = await translateClient.translate(labels.map(label => label.description).join(','), 'zh-CN');

    ctx.body = {
      code: 0,
      labels,
      translations,
    };
  }
}

module.exports = GoogleController;
