//引入express
var express = require('express');

//创建app应用对象
var app =express();

//监听端口
app.listen(4000);

//设置视图模板引擎
app.set('view engine','ejs');

//处理get的 /请求
app.get('/',function(req,res){
    res.end('express application');//返回响应,结束请求
});

//处理get的 /show 请求
app.get('/show',function(req,res){
    // res.end('show express application');
    res.send('express /show');//与end()方法功能一样
});

//处理get的 /login请求,跳转到欢迎界面
app.get('/login',function(req,res){
    var name  = "张三";
    res.render('03_01',{name:name}); //与render()方法功能一样,返回一个视图响应,结束请求
});

//处理练习中,/showpic请求,返回一个图片路径
app.get('/showpic',function(req,res){
    var path = '../images/53f7fd9391f21.jpg';
    res.render('test3',{path:path});
    //图片未显示 ---> 静态文件伺服功能
});