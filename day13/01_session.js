var express = require('express');
var session = require('express-session');
var app = express();
app.listen(4000);


//设置
app.use(session({
    secret:'abc', //通过字符串生成一份hash值并保存到cookie中
    resave:false, //是否需要重新保存
    saveUninitialized:true //每一次访问都自动保存未初始化的值
}));


//设置session
app.get('/',function(req,res){
    req.session.username = '张三';
    req.session.age = 23;
    res.end();
});


//获取session的值
app.get('/get',function(req,res){
    //获取服务器保存的所有session
    var sess = req.session;
    //获取session中保存的某一个值
    console.log(sess);
    var username = sess.username;
    res.send(username);
});