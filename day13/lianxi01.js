var express = require('express');
var session = require('express-session');
var bd = require('body-parser');
var app = express();
app.listen(4000);

// 添加post请求解析
app.use(bd.urlencoded({extended:true}));
// 设置视图模板
app.set('view engine','ejs');

// 设置
app.use(session({
    secret:'lianxi1',
    saveUninitialized:true,
    resave:false
}));
function check(username,password){
    var obj = {
        msg:'',
        result:false
    }
    if(username != '张三'){
       obj.msg = '用户名不正确';
       return obj;
    }
    if(password != '123456'){
       obj.msg = '密码不正确';
       return obj;
    }
    obj.msg = '验证通过';
    obj.result = true;
    return obj;
}

// 解析 / 请求
app.get('/',function(req,res){
    // 获取session
    var session = req.session;
    // 获取账户密码
    var username = session.username;
    var password = session.password;
    var reObj = check(username,password);
    console.log(reObj.msg);
    if(!reObj.result){
        res.render('tologin');
        return;
    }
    res.send('欢迎你:'+username);
});

// 解析 doLogin请求 
app.post('/doLogin',function(req,res){
    // 获取参数
    var username = req.body.username;
    var password = req.body.password;
    // 验证参数
    var reObj = check(username,password);
    // 判断结果
    console.log(reObj.msg);
    if(!reObj.result){
        res.render('tologin');
        return;
    }
    // 设置session
    req.session.username = username;
    req.session.password = password;
    res.send('欢迎你:'+username);
});