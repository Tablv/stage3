var express = require('express');
var student = require('./student.js');
var teacher = require('./teacher.js');
var app = express();

app.listen(4000);

app.get('/',function(req,res){
    res.render('01_static.ejs',function(err,html){
        console.log(html);
        res.send(html);
    });
});

//处理所有以/student开头的请求 ==> student.js
app.use('/student',student);

//处理所有以/teacher开头的请求 ==> teacher.js
app.use('/teacher',teacher);

