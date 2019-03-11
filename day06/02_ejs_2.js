//引入ejs
var ejs  = require('ejs'),
    fs = require('fs');
var http = require('http');

http.createServer(function(req,res){
    if(req.url == '/favicon.ico'){
        return;
    }
    fs.readFile('./02_ejs_2.html',function(err,data){
        if(err){
            console.log(err);
            res.end();
        }else{
            //将data转成字符串
            var str = data.toString();
            //将数据填充到模板页面中去
            //str:模板页面
            //第二个参数:将要填充数据,属性名要与页面中的保持一致
            var html = ejs.render(str,{username:"吕长杰"});
            // 返回页面
            res.end(html);
        }
    });
}).listen(4000);