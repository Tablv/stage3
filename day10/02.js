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
    //修改
    var filter = {id:1}; //修改的条件
    var data = {$set:{name:'张三'}};
    collection.updateOne(filter,data,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        console.log(result.result);
    });


    //关闭连接
    mongo.close();

});

