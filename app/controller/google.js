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

    // annotation
    const { BASE_URL } = this.app.config.upload;
    const visionClient = new Vision.ImageAnnotatorClient();
    let labels = await visionClient.labelDetection(BASE_URL + key);
    labels = labels[0].labelAnnotations.map(item => {
      const { description, score } = item;

      return {
        description,
        score: Math.round(score * 1000) / 10,
      };
    });

    // translate
    const translateClient = new Translate();
    let translations = await translateClient.translate(
      labels.map(label => label.description).join('$'),
      'zh-CN'
    );
    translations = translations[0].split('$');

    // combine
    labels = labels.map((label, index) => {
      return {
        description: translations[index],
        score: label.score,
      };
    });

    ctx.body = { labels };
  }
}

module.exports = GoogleController;
