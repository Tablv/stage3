// 启动文件
var express = require('express');
var bd = require('body-parser');
// 引入session模块
var session = require('express-session');
// 引入路由
var user = require('./route/user.js');
var card = require('./route/card.js');
var app = express();
app.listen(4000);
// 设置session
app.use(session({
    secret:'user', //通过字符串生成一份hash值并保存到cookie中
    resave:false, //是否需要重新保存
    saveUninitialized:true //每一次访问都自动保存未初始化的值
}));
// 添加post解析方式
app.use(bd.urlencoded({extended:true}));
// 设置视图引擎
app.set('view engine','ejs');
// 使用静态伺服
app.use(express.static('./public'));
app.use(express.static('./sourceDB'));

// 使用路由处理请求
app.use('/',user);
// 处理 /user 下的请求
app.use('/user',user);

// 处理 /card 下请求
app.use('/card',card)