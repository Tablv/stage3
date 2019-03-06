//引入http
let http = require('http');

//创建服务
let server = http.createServer(function(req,res){
    // 排除小图标的请求  /favicon.ico
    if(req.url == "/favicon.ico"){
        return;
    }
    console.log("请求方式"+req.method);
    console.log("请求地址"+req.url);
    // req.url可以获取请求路径,参数;但是无法获取#后面的东西(锚点)
    // res.end();
    // 访问服务器,浏览器展示输入的请求地址
    // 你访问的地址是: /a/b
    //设置响应头
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end("你访问的地址是:"+req.url)

});

//监听
server.listen(4000);