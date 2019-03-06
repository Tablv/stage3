// 输入localhost:4000 页面显示一个表单
// 用户输入用户名与密码后,后台接受数据
// 如果输入的用户名与密码 是 zhangsan  123
// 则显示  欢迎你,zhangsan
// 如果输入的内容不是
// 就显示 用户名或密码错误

let http = require('http');
let fs = require('fs');
let url = require('url');
let server = http.createServer(function (req, res) {
    if (req.url == '/favicon.ico') {
        return;
    }
    var urlString = req.url;
    var urlObj = url.parse(urlString,true);
    var pathname = urlObj.pathname;

    res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});

    if (pathname == '/') {
        fs.readFile('./2_test.html', function (err, data) {
            if (err) {
                res.end('数据读取错误!');
            } else {
                res.end(data);
            }
        });
    } else if (pathname == '/check') {
        var argObj = urlObj.query;
        if(argObj.username == "zhangsan" && argObj.password =='123'){
            res.end('欢迎你:'+argObj.username);
        }else{
            res.end('用户名或者密码不正确');
        }
    }
});
server.listen(4000);