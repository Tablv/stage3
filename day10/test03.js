var config = require('./config');
var  mongodb = require('mongodb');
var  client = mongodb.MongoClient;

client.connect(config.url,{useNewUrlParser:true},function(err,mongo){
    var db = mongo.db(config.dbName);
    var collection = db.collection(config.collectionName);

    var filter = {id:1};
    var data = {$set:{username:'zhangsan',password:'123'}};
    collection.updateOne(filter,data,function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log(result.result);
        }
    });

    mongo.close();

});