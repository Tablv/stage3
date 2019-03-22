var express = require('express');
var card = express.Router();
var sd = require('silly-datetime');
// 引入工具类
var dbUtils = require('../contorller/dbUtils.js');
// 引入user集合模型
var dbCard = require('../contorller/schemas.js').dbCrad;


// 处理 /showCard 请求
card.get('/showCard',function(req,res){
    // 获取session
    var unick = req.session.unick;
    // 查询数据
    dbUtils.findDB(dbCard,{},function(err,docs){
        if(err){
            res.render('error',{msg:'帖子查询失败'});
            return;
        }
        res.render('showCard',{unick:unick,data:docs});
    })
});

// /toAddCard 请求
card.get('/toAddCard',function(req,res){
    // 获取session
    var unick = req.session.unick;
    res.render('addCard',{unick:unick});
});
// /doAddCard 请求
card.post('/doAddCard',function(req,res){
    // 获取session
    var uname = req.session.uname;
    // 获取参数
    var data = req.body;
    if(!data.title || !data.content){
        res.render('error',{msg:'题目或者内容不能为空'});
        return;
    }
    data.time = sd.format(new Date(),'YYYY年M月D日 HH时mm分ss秒');
    data.uname = uname;
    dbUtils.insertDB(dbCard,data,function(err,result){
        if(err){
            res.render('err',{msg:'发表失败'});
            return;
        }
        res.redirect('/card/showCard');
    })

})
// 暴露路由
module.exports = card;