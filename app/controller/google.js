'use strict';

const Controller = require('egg').Controller;

class GoogleController extends Controller {
  async index() {
    this.ctx.body = 'Google ctx';
  }
}

module.exports = GoogleController;
