var express = require('express');
// 创建路由(Route)对象
var router = express.Router();

// 使用路由处理请求
//student相关请求
//login请求
router.get('/login',function(req,res){
    console.log(req.url);
    console.log('student 的 login 操纵');
    //返回响应
    res.send('student 的 login 操纵');
});
//regist请求
router.get('/regist',function(req,res){
    console.log(req.url);
    console.log('student 的 regist 操纵');
    //返回响应
    res.send('student 的 regist 操纵');
});
//speak请求
router.get('/speak',function(req,res){
    console.log(req.url);
    console.log('student 的 speak 操纵');
    //返回响应
    res.send('student 的 speak 操纵');
});

//将路由暴露出去
module.exports = router;