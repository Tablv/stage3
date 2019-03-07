let http = require('http');
let fs = require("fs");
let url = require('url');
let server = http.createServer(function (req, res) {
    if (req.url == '/favicon.ico') {
        return;
    }
    var pathname = url.parse(req.url).pathname;
    if(pathname=='/'){
        res.writeHead(200,{"Content-type":"text/html;charset=utf-8"});
        fs.readdir('../images',function(err,files){
            if(err){
                console.log("读取失败");
            }else{
                for(var i=0;i<files.length;i++){
                   res.write("<img src='../images/");
                   res.write(files[i]);
                   res.write("' style='width:600px;height:400px;'>");
                }
                res.end();
            }
        });
    }else{
        fs.readFile('..'+pathname,function(err,data){
            if(err){
                console.log(err);
            }else{
                res.end(data);
            }
        });
    }
});
server.listen(4000);