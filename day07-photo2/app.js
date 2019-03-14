//服务启动程序,接收请求
var express = require('express');
var bd = require('body-parser');
var route = require("./route/route.js")
var app = express();
app.listen(4000);
app.set('view engine','ejs');
app.use(express.static('./uploads'));
app.use(express.static('./public'));
app.use(bd.urlencoded({extended:true}));

// app.js ----> showIndex ---->file.getFiles(---> (fs.readdir(异步方法)---回调函数()) ---> callback()回调函数) 
// 请求/  展示首页
app.get('/',route.showIndex);

//请求 toupload  跳转到上传图片的页面
app.get('/toupload',route.toUpload);

//请求 doupload   上传图片  post
app.post('/doupload',route.doUpload);

// /newdir  跳转到新建相册页面
app.get('/newDir',route.toNewDir);

// createDir请求,新建相册
app.post('/createDir',route.doCreateDir);

// 点击某个相册,显示相册的内容更
app.get('/showPic/:dirName',route.showPic);

// 点击删除,删掉文件夹
app.get('/del',route.deleteDir);    