//程序启动文件,开启服务
var express = require('express');
var fs = require('fs');
var sd = require('silly-datetime');
var fd = require('formidable');
var app = express();
app.listen(4000);

//设置视图模板
app.set('view engine','ejs');
//设置根目录
app.use(express.static('./public'));
app.use(express.static('./uploads'));

//访问首页 localhost:4000,展示相册首页
app.get('/',function(req,res){
    //首页展示所有相册
    //读取uploads中有哪些相册
    fs.readdir('./uploads',function(err,files){
        if(err){
            console.log(err);
            res.send('读取数据出错,请稍后再试');
            return;
        }
        //读取到uploads中的文件夹,将其在页面展示
        res.render('index',{dirs:files});
    });
});

//点击上传图片 发送/toUpload请求,跳转到上传图片的页面
app.get('/toUpload',function(req,res){
    //长传图片界面需要选择上传的目标文件夹
    //文件夹是通过下拉菜单选择已有的文件夹
    //需要将已有的文件夹传递给页面
    fs.readdir('./uploads',function(err,files){
        if(err){
            console.log(err);
            res.send('读取文件夹失败,请稍后再试');
            return;
        }
        res.render('upload',{dirs:files});
    });
});

//点击上传图片按钮,发送post请求/doUpload将选择的图片上传
app.post('/doUpload',function(req,res){
    var form = fd.IncomingForm();
    form.uploadDir = './uploads';
    form.parse(req,function(err,fields,files){
        if(err){
            console.log(err);
            res.send('上传失败');
            return;
        };
        //文件夹名称
        var dirName = fields.dirName;
        //图片
        var pic = files.pic;
        //旧路径
        var oldPath = pic.path;
        var oldName = pic.name;
        //新名称
        var str = sd.format(new Date(),'YYYYMMDDHHmmss');
        var ext = oldName.split('.').pop();
        //新路径
        var newPath = 'uploads/'+dirName + '/' + str + '.' + ext;
        //重命名
        fs.rename(oldPath,newPath,function(err){
            if(err){
                console.log(err);
                res.send('重命名失败');
                return;
            }
            // res.send('改名成功');
            //上传成功跳转到首页 / 
            res.redirect('/'); //重定向
        });
    });
});