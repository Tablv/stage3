var http = require('http'),
    fd = require('formidable'),
    fs = require('fs'),
    sd = require('silly-datetime');

var server = http.createServer(function(req,res){
    if(req.url == '/favicon.ico'){
        return;
    }
    if(req.url == '/upload' && req.method.toLowerCase() == 'post'){
        //处理请求
        //获得form表单
        var form = new fd.IncomingForm();
        //设置保存目录
        form.uploadDir = './';
        //解析请求
        form.parse(req,function(err,fields,files){
            if(err){
                console.log(err);
                return;
            }
            console.log(fields);
            //改名称
            var oldPath = files.upload.path;
            var oldName = files.upload.name;
            //新名称
            //获取上传文件的后缀名
            var ext = oldName.split('.').pop();//后缀名
            var time = sd.format(new Date(),'YYYYMMDDHHmmss');
            var rand = Math.round(Math.random()*900)+100;
            var newPath = fields.fileDir;
            var newName = newPath+"/"+time+rand+"."+ext;
            fs.rename(oldPath,newName,function(err){
                if(err){
                    console.log(err);
                    res.end();
                    return;
                }
                res.end();
            });
            res.end();
        });
    }else{
        fs.readFile('./01.html',function(err,data){
            if(err){
                console.log(err);
                res.end(err);
            }else{
                res.end(data);
            }
        });
    }
});

server.listen(4000);