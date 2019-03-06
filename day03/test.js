let http = require('http');
let url = require('url');
let fs = require('fs');
let server = http.createServer(function(req,res){
    if(req.url == '/favicon.ico'){
        return;
    }
    // 1.输入localhost:4000  页面显示这是首页
    // 1.输入localhost:4000/circle  页面显示 红色的圆形
    // 1.输入localhost:4000/square  页面显示 蓝色的方形
    // 4.输入其他地址,页面显示 地址错误
    var urlString = req.url;
    var uobj = url.parse(urlString,true);
    var pathname = uobj.pathname;
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    // 判断
    if(pathname=="/"){
        res.end("this is index");
    }
    if(pathname=="/circle"){
        // 读红色圆形
        console.log('you know sha');
        fs.readFile('./red_circle.html',function(err,data){
            console.log('i know sha');
            if(err){
                res.end('读取失败');
            }else{
                res.end(data);
                console.log('hai know sha');
            }
        });
    }
    if(pathname=="/square"){
        // 读蓝色的方形
        fs.readFile('./blue_square.html',function(err,data){
            if(err){
                res.end('读取失败');
            }else{
                res.end(data);
            }
        });
    }
    
    

});
server.listen(4000);