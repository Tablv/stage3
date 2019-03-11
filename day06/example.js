// 引入模块
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
//创建服务
http.createServer(function (req, res) {
    if(req.url =='favicon.ico'){
        return;
    }
    //处理请求
    /*
        post方式的upload请求
     */
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        // parse a file upload
        // 获取表单对象
        var form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            console.log(req.url);
            console.log(fields);
            console.log(files);
            res.writeHead(200, {
                'content-type': 'text/plain'
            });
            res.write('received upload:\n\n');
            res.end(util.inspect({
                fields: fields,
                files: files
            }));
        });

        return;
    }
    //请求
    res.writeHead(200, {
        'content-type': 'text/html'
    });
    res.end(
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="text" name="title"><br>' +
        '<input type="file" name="upload" multiple="multiple"><br>' +
        '<input type="submit" value="Upload">' +
        '</form>'
    );
}).listen(4000);