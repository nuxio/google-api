'use strict';

const Controller = require('egg').Controller;
const UserModel = require('../service/User');

class UserController extends Controller {
  async index() {
    await this.ctx.render('user/index.tpl');
  }

  async login() {
    const { APP_ID, SECRET } = this.app.config.miniProgram;
    const { code } = this.ctx.req.body;
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`;
    const reuslt = await this.ctx.curl(url);

    this.ctx.body = reuslt;
  }

  async register() {
    const ctx = this.ctx;
    const {
      openId,
      nickName,
      gender,
      city,
      province,
      country,
      avatarUrl,
      createTime,
      latestTime,
    } = ctx.request.body;

    if (!openId) {
      ctx.body = {
        code: -1,
        msg: 'ERROR: openId is empty.',
      };
      return;
    }

    let user = await UserModel.findByOpenId(openId);
    if (!user) {
      user = await UserModel.register({
        openId,
        nickName,
        gender,
        city,
        province,
        country,
        avatarUrl,
        createTime,
        latestTime,
      });

      ctx.body = {
        code: 0,
        user,
      };
    } else {
      user = await UserModel.updateLatestTime(openId);
    }

    ctx.body = {
      code: 0,
      user,
    };
  }
}

module.exports = UserController;
