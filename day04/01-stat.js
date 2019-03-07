let fs = require('fs');

fs.stat('./day04笔记.html',function(err,stats){
    if(err){
        console.log(err);
        return;
    }
    //stats 是一个对象,Stats类型
    if(stats.isDirectory()){
        console.log("这是一个文件夹");
    }
    if(stats.isFile()){
        console.log("这是一个文件");
    }
});