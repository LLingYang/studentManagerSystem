/**
 * 面向mongodb和控制器写代码
 */
'use strict';
//导入数据库相关包
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
//连接到mongodb数据库
const url = 'mongodb://localhost:27017/Yangling';
//获取db对象
function getDB(callback){
  MongoClient.connect(url, function(err, db) {
    if(err){
      console.log(err);
    }
    callback(err,db);
  });
}

//查询一个的公用方法
exports.findOne=(collectionName,collectionCondition,callback)=>{
  //1.获取到db对象
  getDB((err,db)=>{
    //根据控制器传递过来的collectionName,collectionCondition做事
    db.collection(collectionName).findOne(collectionCondition,(err,doc)=>{
      if(err){
        console.log(err);
      }
      //将结果传递给调用datebasemanager的控制器
      console.log(doc);
      callback(err,doc);
      db.close();
    })
  })
};

