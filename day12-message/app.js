var express = require('express');
var bd = require('body-parser');
var route = require('./ctrl/controller.js');
var app = express();
app.listen(4000);

// 设置视图模板引擎
app.set('view engine','ejs');
// 使用bd解析方式
app.use(bd.urlencoded({extended:true}));


// 处理 / 请求,展示所有的留言信息
app.get('/',route.showIndex);

// 处理 post的/tijiao请求,发表留言,将留言保存进数据库
app.post('/tijiao',route.speak);

// 处理/toUpdate/id的请求,其中_id是参数
app.get('/toUpdate/:id',route.toUpdate);

// 处理/dpUpdate请求,修改数据
app.post('/doUpdate',route.doUpdate);

// 处理 /del请求,修改数据
app.get('/del/:id',route.delete);