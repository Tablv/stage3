let http = require('http');
let fs = require('fs');
let url = require('url');
let server = http.createServer(function(req,res){
    if(req.url == '/favicon.ico'){
        return;
    };
    console.log(req.method);
    res.writeHead(200,{"Content-Type":"text/html;charset=urf-8"});
    fs.readFile('./index.html',function(err,data){
        if(err){
            res.end('错误数据');
        }else{
            res.end(data);
        };
    });
});
server.listen(4000);