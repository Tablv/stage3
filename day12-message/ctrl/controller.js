//  处理 / 请求
var db = require('../mymodel');
var sd = require('silly-datetime');
var User = db.schemas.User;
var Message = db.schemas.Message;
var ObjectId = db.ObjectId;
// 处理/ 请求
exports.showIndex = function(req,res){
    // 将数据库中留言的信息展示到首页上
    db.find(Message,function(err,docs){
        if(err){
            console.log(err);
            return;
        }
        res.render('index',{data:docs});
    });
}
//post的/tijiao请求,发表留言
exports.speak = function(req,res){
    // 获取参数
    var data = req.body;
    // 获取当前时间,并将其转成成字符串
    var dateString = sd.format(new Date(),'YYYY年MM月DD日 HH时mm分ss秒');
    // 将数据保存进数据库
    data.time = dateString;
    db.add(Message,data,function(err,result){
        console.log(err,result);
        if(err){
            res.send('留言失败');
            return;
        }
        // 留言成功回到首页
        res.redirect('/');
    });
};

exports.toUpdate = function(req,res){
    // 跳转到修改页面
    // 获取参数
    var id = req.params.id;
    // 将参数id转换为 objectid类型
    id = ObjectId(id);
    db.find(Message,{_id:id},function(err,docs){
        if(err){
            res.send('连接数据库失败');
            return;
        }
        // 连接成功,带着数据,跳转到修改页面
        res.render('update',{data:docs.shift()})
    });
}

exports.doUpdate = function(req,res){
    //获取参数
    var id = req.body.id;
    id = ObjectId(id);
    var content = req.body.content;
    var filter = {_id:id};
    var json = {
        content:content
    }
    db.update(Message,filter,json,function(err,result){
        if(err){
            res.send('修改失败');
            return;
        }
        res.redirect('/');
    });
}

exports.delete = function(req,res){
    // 获取参数
    var id = req.params.id;
    id = ObjectId(id);
    filter = {_id:id};
    db.del(Message,filter,function(err,result){
        if(err){
            console.log('删除失败');
            return;
        }
        res.redirect('/');
    });
}