var express = require('express');
var fd = require('formidable');
var fs = require('fs');
var app = express();

app.listen(4000);

app.use(express.static('./public'));
app.set('view engine','ejs');

// / 请求,跳转到上传图片页面
app.get('/',function(req,res){
    res.render('upload');
});

app.post('/doUpload',function(req,res){
    var form = new fd.IncomingForm();
    form.uploadDir = './public';
    form.parse(req,function(err,fields,files){
        if(err){
            console.log(err);
            return;
        }
        var pic = files.pic;
        var oldPath = pic.path;
        var oldName = pic.name;
        var newPath = './public/' + oldName;
        fs.rename(oldPath,newPath,function(err){
            if(err){
                console.log(err);
                return;
            }
            // 上传成功,跳转到剪切的页面(带上刚刚上传的图片);
            res.render('cut',{pic:oldName});
        })
    });
});