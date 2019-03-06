// 引入http
let http = require('http');

//通过http对象,创建服务器
var server = http.createServer(function(req,res){
    //服务器做的事
    //req:浏览器发送过来的请求
    //res:服务器返回的响应

    //返回一个字符串给浏览器
    //end()只能出现一次(一次请求,一次响应)

    
    
    //为防止乱码出现,需要设置响应头,告诉浏览器解码方式
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end('this is my first node.js 中文');
    /*
    end的作用:
    结束请求
    返回响应
    */
});

//开启服务,监听端口
server.listen(4000);