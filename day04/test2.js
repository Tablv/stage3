let http = require('http');
let fs = require('fs');
let url = require('url');
let server = http.createServer(function (req, res) {
    if (req.url == '/favicon.ico') {
        return;
    }
    var urlStr = req.url;
    var urlObj = url.parse(urlStr,true);
    var pathname = urlObj.pathname;
    var argArr = urlObj.query;
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    if(pathname == '/reg'){
        var username = argArr.username;
        var password = argArr.password;
        // 创建一个username.txt的文件,内容为password
        var txtUrl = "./" + username + ".txt";
        fs.writeFile(txtUrl,password,function(err){
            if(err){
                console.log(err);
                res.end('nonnonononon err');
            }else{
                console.log("写入成功");
                res.end('yes hello'+username);
            }
        });

    }else{
        fs.readFile('./test2.html',function(err,data){
            if(err){
                res.end(err);
            }else{
                res.end(data);
            }
        });
    }

});
server.listen(4000);