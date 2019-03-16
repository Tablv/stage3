//引入mongodb模块
var mongodb = require('mongodb');
//获得mongodb客户端
var client = mongodb.MongoClient;

//连接地址
var url = 'mongodb://localhost:27017';
//建立连接
client.connect(url,{useNewUrlParser:true},function(err,mongo){
    if(err){
        console.log(err);
    }else{
        // console.log(mongo);
        // 获得数据库
        var web = mongo.db('web');
        // 创建新集合 student
        var student = web.collection('student');
        //插入的数据
        data = [
            {id:1,name:"Jack",age:12,hobbies:["读书","游泳"],score:{math:89,english:60,PE:77}},
            {id:2,name:"Mike",age:11,hobbies:["旅游","运动"],score:{math:89,english:87,PE:86}},
            {id:3,name:"Lucy",age:12,hobbies:["旅游","读书"],score:{math:88,english:56,PE:66}},
            {id:4,name:"Lily",age:11,hobbies:["运动","游泳"],score:{math:84,english:78,PE:34}}
        ];
        // 插入数据
        student.insertMany(data,function(err,result){
            if(err){
                console.log(err);
            }else{
                console.log(result);
            }
        });
    }
    //关闭连接
    mongo.close();
});