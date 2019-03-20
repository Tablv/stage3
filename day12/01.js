var express = require('express');
var cookie = require('cookie-parser');
var app = express();
app.listen(4000);
// 使用cookie解析
app.use(cookie());

app.get('/',function(req,res){
    // 设置cookie
    // 第一个参数,表示保存cookie时的key
    // 第二个参数,表示保存cookie的value
    res.cookie('name','jim');
    // 可以设置多个cookie
    res.cookie('age','23');
    // 如果保存的cookie的key已经存在,则后保存的会替换掉前面的
    res.cookie('name','mike'); 
    // 设置cookie的有效声明周期
    res.cookie('time','xxxx',{maxAge:10000});
    // console.log(req.cookie)
    res.send('首页');
});
// 获取cookie
app.get('/get',function(req,res){
    console.log(req.cookies); // json对象
    res.end();
});