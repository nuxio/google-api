'use strict';

const Controller = require('egg').Controller;

class ApiController extends Controller {
  async index() {
    this.ctx.body = 'This is a google api test project. Powered by egg.js.';
  }
}

module.exports = ApiController;
