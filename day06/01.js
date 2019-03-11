var formidable = require('formidable'),
    fs = require('fs'),
    http = require('http'),
    sd = require('silly-datetime');

var server = http.createServer(function (req, res) {
    if (req.url == '/favicon.ico') {
        return;
    }
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        //获取表单对象
        var form = new formidable.IncomingForm();
        //设置文件的上传保存的地址,要在解析之前保存
        form.uploadDir='./';
        
        //解析请求
        form.parse(req,function(err,fields,files){
            if(err){
                console.log(err);
            }else{
                console.log(fields);
                console.log(files);
                //修改文件名称
                // rename(旧路径,新路径,回调函数)
                var oldPath = files.upload.path; //旧路径
                var oldName = files.upload.name; //旧名称
                //获取上传文件的后缀名
                var ext = oldName.split('.').pop();//后缀名
                var time = sd.format(new Date(),'YYYYMMDDHHmmss');
                var rand = Math.round(Math.random()*900)+100;
                //新名称,还可以拼接 路径
                var newName = time+rand+"."+ext;
                // 修改名称
                fs.rename(oldPath,newName,function(err){
                    if(err){
                        console.log(err);
                        res.end();
                        return;
                    }
                    res.end();
                })
                res.end();
            }
        });
    } else {
        fs.readFile('./01.html', function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.end(data);
            }

        });
    }
});

server.listen(4000);