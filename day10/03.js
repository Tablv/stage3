var config = require('./config');
var mongodb = require('mongodb');
var client = mongodb.MongoClient;


client.connect(config.url,{useNewUrlParser},function(err,mongo){
    if(err){
        console.log(err);
        return;
    }
    // 连接数据库
    var db = mongo.db(config.dbName);
    // 连接集合
    var collection = db.collection(config.collectionName);
    
    //增删该查
    //只查询第三条到第四条数据
    collection.find({}).skip('2').limit('2').toArray(function(err,docs){
        console.log(err,docs);
    });
    
    //查询所有 
    // var filter = {}
    // 查询学号为3号的信息
    // var filter = {id:3?}
    // 查询年龄不满12岁的信息
    // var filter = {age:{$lt:12}}
    // 查询爱好游泳的信息
    // var filter = {hobbies:'游泳'}
    // 查询PE分数高于70分的信息
    var filter = {'score.pe':{$gt:70}}

    //关闭连接
    mongo.close();

});

