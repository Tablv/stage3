var express = require('express');
var app = express();
app.listen(4000);

app.get('/',function(req,res){
    res.send('index');
});

// 设置参数:在请求路径前加 :
// 获取参数:req.params
app.get('/a/:id',function(req,res){
    console.log(req.query);
    console.log(req.params);
    res.send('你传入的参数是:' + req.params.id);
});

//正则表达式 的使用
//匹配 /student/6位数字
//正则中固定不变的部分作为请求地址
//变化的部分,作为请求参数
// 做为参数的部分 要用() 括起来
app.get(/^\/student\/([0-9]{6})a([0-9]{5})$/,function(req,res){
    console.log(req.query);
    res.send('请求成功'+req.params[0]+","+req.params[1]);
});