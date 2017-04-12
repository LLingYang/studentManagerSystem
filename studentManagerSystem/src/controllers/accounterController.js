'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
//导入验证码第三方包
const captchapng = require('captchapng');

const datebasemanager = require(path.join(__dirname,'../tools/datebasemanager.js'));
//获取登录页面
exports.getLoginPage = (req,res)=>{
  fs.readFile(path.join(__dirname,'../views/login.html'),(err,data)=>{
    if(err){
      console.log(err);
    }
    res.setHeader('Content-Type','text/html;charset=utf-8');
    res.end(data);
  })
}
//获取验证码 返回图片
exports.getVcodeImage = (req,res)=>{
  var vcode = parseInt(Math.random()*9000+1000);
  //通过req.session获取到的就是专属于某个浏览器的内存空间
  req.session.vcode = vcode;//把vcode存储在专属的内存空间中

  var p = new captchapng(80,30,vcode); // width,height,numeric captcha
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

        var img = p.getBase64();
        var imgbase64 = new Buffer(img,'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.end(imgbase64);
}

//登录业务逻辑处理
exports.login=(req,res)=>{
  if(req.session.vcode!=req.body.vcode){
    res.end("<script>alert('验证码输入错误！');window.location.href= '/account/login'</script>");
    return;
  }
  //查询数据库 找到用户名 和密码
  datebasemanager.findOne('account',{username:'admin',password:123},(err,doc)=>{
    console.log(doc);
    if(doc==null){
      res.end("<script>alert('用户名或密码有误！');window.location.href= '/account/login'</script>");
    }else{
      res.end("<script>window.location.href='/studentmanager/list?everyPageCount=2&currentPageIndex=0'</script>");
    }
  });
}


