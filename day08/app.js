var express = require('express');
var bd = require('body-parser');
var route = require('./route/route.js');
var app = express();
app.listen(4000);

//设置引擎
app.set('view engine','ejs');
//设置根目录
app.use(express.static('./public'));
app.use(express.static('./sourcedb'));
//添加请求方式
app.use(bd.urlencoded({extended:true}));

//规定:显示页面  to开头

//处理请求 / 显示 首页
app.get('/',route.showIndex);

/*
处理跳转请求 
    /toRegist 显示注册页面
    /toLogin  显示注册页面
*/
app.get('/toRegist',route.showPage);
app.get('/toLogin',route.showPage);

/**
处理操作请求
    /doRegist 注册,将注册输入写入 sourcedb/user.txt
*/
app.post('/doRegist',route.regist);
/**
处理操作请求
    /doLogin 登录,读取账号密码 sourcedb/user.txt 进行校验
*/
app.post('/doLogin',route.login);

/*
    处理 /toGood请求  跳转到给进货页面
*/
app.get('/toGood',route.showPage);

/*
    处理 /addGood 请求 将数据添加到 goods 集合中,并跳转到show页面
*/ 
app.post('/addGood',route.addGood);

// 处理 /showGood 请求,将goods中的数据展示在页面上
app.get('/showGood',route.showGood);

// 处理 /deleteGood  ,将选定的内容删除掉
app.get('/deleteGood',route.deleteGood);

// 处理 /toUpdateGood , 跳转到 修改商品的内容
app.get('/toUpdateGood',route.showGood);

// 处理 /updateGood  将指定的内容进行修改
app.post('/updateGood',route.updateGood);