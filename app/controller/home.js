'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // render a template, path relate to `app/view`
    await this.ctx.render('home/index.tpl');
  }
}

module.exports = HomeController;
