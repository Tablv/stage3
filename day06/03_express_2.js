var express = require('express');

var app = express();

app.listen(4000);

//设置根目录
app.use(express.static('./project'));

