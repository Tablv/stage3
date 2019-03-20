var express = require('express');
var cookie = require('cookie-parser');
// var bd = require('body-parser');
var app = express();
app.listen(4000);
app.use(cookie());
// app.use(bd.urlencoded({extended:true}));
// 处理 / 请求
app.get('/', function (req, res) {
    // 发一次请求,代表访问一次
    // 获取 cookie
    var cookies = req.cookies;
    // 获取访问次数
    var count = cookies.count || 0;
    count++;
    res.cookie('count', count);
    res.send('你已经访问本网站:' + count + '次');
})

// /search,将曾经搜索过的历史记录全部显示
// /search?name=xxx
app.get('/search',function(req,res){
    //请求参数
    var name = req.query.name;
    //获取请求带来的cookies
    var cookies = req.cookies; // json {name=[]}
    // 获取cookie中name
    // 如果有,就用,没有就创建一个
    var search = cookies.name || [];
    // 将本次访问的数据保存进search中
    search.push(name);
    // 将search重新保存进cookie
    res.cookie('name',search);
    res.send(search);
}); 


app.get('/login',function(req,res){
    // 获取 cookie
    var cookies = req.cookies;
    // 查找用户名密码
    var username =  req.query.username || cookies.username;
    var password =  req.query.password || cookies.password;
    if(username=='zhangsan' && password=='123456'){
        // 如果两个参数都有,直接去尝试登录
        res.cookie('username',username);
        res.cookie('password',password);
        res.send('欢迎你:'+username);
        return;
    }
    // 两者有一个undefined,就是cookie保存的数据不全,跳转到登录页面
        var html = "<form action='/login' method='GET'> username:<input type='text' name='username'><br>"
        html += "password:<input type='text' name='password'><br>"
        html += "<input type='submit' value='登录'></form>";
        res.send(html);
})
