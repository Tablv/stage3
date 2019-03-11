let http = require('http');
let fs = require('fs');
let ejs = require('ejs');

http.createServer(function(req,res){
    if(req.url == '/favicon.ico'){
        return;
    }
    fs.readFile('./02_ejs_3.html',function(err,data){
        if(err){
            console.log(err);
            res.end("read html err");
        }else{
            //转成字符串,模板
            var str = data.toString();
            var obj = {
                name:'吕长杰',
                age:23,
                hobiies:['游泳','盘山','喝水']
            };
            //填充模板
            var html = ejs.render(str,obj);
            //返回响应页面
            res.end(html);
        }
    });
}).listen(4000);