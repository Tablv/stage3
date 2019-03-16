//连接数据库
// 引入模块,获取客户端对象
var ndb = require('mongodb');
var client = ndb.MongoClient;

//连接地址
var url = 'mongodb://localhost:27017';

client.connect(url,{useNewUrlParser:true},function(err,mongo){
    if(err){
        console.log(err);
    }else{
        //获取数据库(如果数据库不存在,则自动创建)
        var db = mongo.db('web');
        //获取集合
        var collection = db.collection('stu');
        //增删该查
        //新增数据
        var data = {'id':7,'name':'userp','age':10,'hobbies':['学习','开车'],'score':{'english':88,'PE':66,'math':100}};
        collection.insertOne(data,function(err,result){
            if(err){
                res.send(err);
            }else{
                res.send(result);
            }
        });
        //关闭连接
        mongo.close();
    }
});