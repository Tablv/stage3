let http = require('http');
let fs = require('fs');
let ejs = require('ejs');
let fd = require('formidable');

let server = http.createServer(function (req, res) {
    if (req.url == '/favicon.icon') {
        return;
    }
    res.writeHead(200, {
        "Content-Type": "text/html;charset=utf-8"
    });
    if (req.url == '/login' && req.method.toLowerCase() == 'post') {
        //获取表单数据
        var form = fd.IncomingForm();
        //解析
        form.parse(req, function (err, fields, files) {
            var username = fields.username;
            //封装数据
            var obj = {
                username: username
            };
            //搭建模板
            var str = '欢迎你,<%= username %>';
            //填充模板
            var html = ejs.render(str, obj);
            res.end(html);
        });
    } else {
        fs.readFile('./test2.html', function (err, data) {
            if (err) {
                console.log(err);
                res.end('read html error');
            } else {
                res.end(data);
            }
        });
    }
});
server.listen(4000);