var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.listen(4000);

//设置请求内容的解析方式
//类似于下面的代码
//application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended:true}));

//请求处理会忽略大小写,忽略?后面的参数,忽略#后面的锚点
// 获取get请求的参数: req.query
app.get('/abc',function(req,res){
    console.log(req.query);
    res.send('/abc 请求成功!')
});

//处理post的/tijiao请求
// 获取参数,需要使用另一个模块 body-parser
app.post('/tijiao',function(req,res){
    // 当使用了 body-parser之后,req中会 增加一个body属性
    // 该属性就是参数对象
    console.log(req.body);
    res.send('提交 post 请求');
});