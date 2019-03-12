var express = require('express');

var app = express();

app.listen(4000);

// 忽略大小写,忽略参数,忽略锚点
// 可以处理以 请求path(/a) 开头的所有层级的请求
// 例如 /a/b /a/b/ac/g/h/fd/  这些请求都会得到处理响应 
// app.use('/a',function(req,res){
//     res.send('get /a');
// });
// 例如用use处理/请求,那么所有的请求都会得到处理响应
// app.use('/',function(req,res){
//     res.send('/开头的请求')
// });
// 上面的写法,可以简写成下面的方式
// app.use(function(req,res){
//     res.send('/开头的请求')
// });

/* 请求执行的顺序 */
//通常情况下,模糊匹配要放在精准匹配的后面

//如果摸个请求不想让模糊匹配执行,可以使用第三个参数  next

// 模糊匹配
app.get('/stu/:id', function (req, res, next) {
    if (req.url == '/stu/login') {
        //如果请求地址是这个,不处理,交个后续的中间件来处理
        next();
    } else {
        res.send('学生的学号' + req.params.id);
    }
});
//精确匹配
app.get('/stu/login', function (req, res) {
    res.send('学生的login请求');
});