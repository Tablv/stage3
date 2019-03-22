// 引入express
var express = require('express');
var fd = require('formidable');
// 创建路由对象
var user = express.Router();
// 引入工具类
var utils = require('../contorller/utils.js');
var dbUtils = require('../contorller/dbUtils.js');
// 引入user集合模型
var dbUser = require('../contorller/schemas.js').dbUser;
var dbCrad = require('../contorller/schemas.js').dbCrad;


// 处理 / 请求
user.get('/',function(req,res){
    // 获取登录状态
    var uname = req.session.uname;
    // 如果已经登录了就直接跳到欢迎页面
    if(uname){
        // 存在登录账户
        // 转发请求 到showCrad
        res.redirect('/card/showCard');
        return;
    }
    // 如果没有登录,则需要跳转到登录页面
    res.render('login');
});
// 跳转到登录界面
user.get('/toLogin',function(req,res){
    res.render('login')
});
// 跳转到注册界面
user.get('/toRegist',function(req,res){
    res.render('regist');
});
// 完成注册
user.post('/doRegist',function(req,res){
    // 获取参数
    var data = req.body;
    var uname = data.uname;
    dbUtils.findDB(dbUser,{uname:uname},function(err,docs){
        if(err){
            res.render('error',{msg:'查询用户名失败'});
            return;
        }
        if(!docs.length){
            // 查询结果为 0 ,代表该uname没有注册过
            // 可以执行插入操作
            data.upass = utils.encryption(data.upass);
            dbUtils.insertDB(dbUser,data,function(err,result){
                if(err){
                    res.render('error',{msg:'注册失败'});
                    return;
                }
                res.render('login');
            });
        }else{
            // 给出回应
            console.log('用户名重复');
            res.render('error',{msg:'用户名重复'});
        }
    });
    
});

// 完成登录
user.post('/doLogin',function(req,res){
    // 获取参数
    var uname = req.body.uname;
    var upass = req.body.upass;
    console.log(req.body);
    // 去验证
    dbUtils.findDB(dbUser,{uname:uname},function(err,docs){
        if(err){
            res.render('error',{msg:'查询用户名失败'});
            return;
        }
        // docs 的长度不为空 代表 查询成功
        if(docs.length){
            var user = docs.pop();  // 拿到查询对象
            console.log(user);
            // 数据库内的密码
            var password = user.upass;
            // 输入的密码
            upass = utils.encryption(upass);
            // 进行验证
            var obj = utils.checkout(upass,password);
            // 如果验证不通过
            if(!obj.status){
                res.render('error',{msg:'密码'+obj.msg});
                return;
            }
            // 如果验证通过
            req.session.uname = user.uname;
            req.session.unick = user.unick;
            res.redirect('/card/showCard')
            return;
        }
        res.render('error',{msg:'用户不存在'});
    })
});
// 查看他人信息
user.get('/showOtherUser/:uname',function(req,res){
    // 获取参数
    var unick = req.session.unick;
    var uname = req.params.uname;
    var data = {};
    dbUtils.findDB(dbUser,{uname:uname},function(err,docs){
        if(err){
            res.render('error',{msg:'获取个人信息失败'});
            return;
        }
        data.docs = docs.pop();
        dbUtils.findDB(dbCrad,{uname:uname},function(err,docs){
            if(err){
                res.render('error',{msg:'获取个人发帖失败'});
                return; 
            }
            data.card = docs;
            data.unick = unick;
            res.render('otherUser',data);
        });
    });
});


// 展示个人信息
user.get('/showUser',function(req,res){
    // 获取session
    var uname = req.session.uname;
    var unick = req.session.unick;
    dbUtils.findDB(dbUser,{uname:uname},function(err,docs){
        if(err){
            res.render('error',{msg:'获取个人信息失败'});
            return;
        }
        res.render('showUser',{unick:unick,docs:docs.pop()});
    });
});

// 将路由暴露出去
module.exports = user;