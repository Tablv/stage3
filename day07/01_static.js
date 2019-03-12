var express = require('express');

var app = express();

app.listen(4000);

//设置视图模板引擎
app.set('view engine','ejs');
//设置根目录
app.use(express.static('./public'));
app.get('/',function(req,res){
    res.render('01_static');
});