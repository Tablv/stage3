// 工具类

var fs = require('fs');


// 写入文件
exports.uWrite = function(path,data,callback){
    fs.appendFile(path,data,function(err){
        callback(err);
    });
};

//读取文件
exports.uRead = function(path,callback){
    fs.readFile(path,function(err,data){
        callback(err,data);
    });
};