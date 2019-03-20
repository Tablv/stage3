// 路由
var express = require('express');
var router = express.Router();
var mymodel = require('../mymodel');


router.get('/showIndex',function(req,res){
    // 显示首页
    mymodel.db.find(mymodel.schema.Message,{},function(err,docs){
        console.log(err,docs);
    })
})