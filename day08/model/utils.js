// 工具类

var fs = require('fs');
var mongodb = require('mongodb');

// 写入文件
exports.uWrite = function (path, data, callback) {
    fs.appendFile(path, data, function (err) {
        callback(err);
    });
};

//读取文件
exports.uRead = function (path, callback) {
    fs.readFile(path, function (err, data) {
        callback(err, data);
    });
};


// 对数据库操作
//封装 连接客户端
function getDb(filter,mongolist, callback) {
    //设置参数
    if(filter._id != null){
        var ObjectId = mongodb.ObjectID;
        var id = filter._id;
        filter._id = new ObjectId(id); 
    }
    //获取客户端
    var client = mongodb.MongoClient;
    //建立连接
    client.connect(mongolist.url, {useNewUrlParser: true}, function (err, mongo) {
        if(err){
            console.log(err);
            return;
        }
        var db = mongo.db(mongolist.db);
        var collection = db.collection(mongolist.collection);
        callback(collection);
        mongo.close();
    });
}

// 增加
exports.dbInsert = function (data, mongolist, callback) {
    getDb({},mongolist, function(collection) {
        //插入数据
        collection.insertOne(data, function (err, result) {
            callback(err, result);
        });
    });
}

// 查询
exports.dbFind = function (filter, mongolist, callback) {
    getDb(filter,mongolist, function(collection) {
        //查询数据
        collection.find(filter).toArray(function (err, docs) {
            callback(err, docs);
        });

    });
}

//删除
exports.dbDelete = function (filter, mongolist, callback) {
    getDb(filter,mongolist, function(collection) {
        //删除数据
        collection.deleteOne(filter, function (err, result) {
            callback(err, result);
        });
    })
};

//修改
exports.dbUpdate = function (filter, mongolist, callback,data) {
    getDb(filter,mongolist, function(collection) {
        //修改数据
        collection.updateOne(filter,data,function(err,resulte){
            callback(err,resulte);
        });
    })
};

