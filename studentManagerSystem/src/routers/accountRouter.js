'use strict';

const express = require('express');

const path = require('path');
//创建路由
const accountRouter = express.Router();
const accountCtrl = require(path.join(__dirname,'../controllers/accounterController.js'));

//请求 处理 响应
//获取登录页面
accountRouter.get('/login',accountCtrl.getLoginPage);
//获取验证码
accountRouter.get('/vcode',accountCtrl.getVcodeImage);
//登录逻辑处理
accountRouter.post('/login',accountCtrl.login);

//导出
module.exports = accountRouter;