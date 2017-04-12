'use strict';
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');


const app = express();
//使用cookie来存储数据
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));
//post请求
app.use(bodyParser.urlencoded({ extended: false }));
//处理静态资源
app.use(express.static(path.join(__dirname,'src/statics')));

const accountRouter = require(path.join(__dirname,'src/routers/accountRouter.js'));
app.use('/account',accountRouter);

app.listen(3000,'127.0.0.1',(err)=>{
  if(err){
    console.log(err);
  }
  console.log('启动成功');
})


