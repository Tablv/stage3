// 创建服务
var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();
app.listen(4000);

// 设置视图引擎
app.set('view engine','ejs');

// 读取id
var id = fs.readFileSync('./id.txt');


// 创建schema
// 第二个参数,指定数据库使用的集合的名称
// 使用这个参数,那么创建model时的第一个参数将被废除
var producetSchema = mongoose.Schema({
    name:String,
    price:String,
    amount:String,
    id:String
},{collection:'shop'});  

// 创建model
var Product = new mongoose.model('product',producetSchema);


// 连接数据库 尾部web 数据库的名字
var url = 'mongodb://localhost:27017/web'
mongoose.connect(url,{useNewUrlParser:true});

//处理 / 请求,显示shop集合中的所有数据
app.get('/',function(req,res){
    Product.find(function(err,docs){
        if(err){
            res.render('error',{data:'连接数据库失败'});
            return;
        }
        res.render('index',{products:docs});
    });
});

// 跳转到新增页面
app.get('/toAdd',function(req,res){
    res.render('add');
});

// 新增数据
app.get('/doAdd',function(req,res){
    var query = req.query;
    query.id = id++ + '';
    fs.writeFileSync('./id.txt',id);
    // 保存数据
    // 使用 schema编译得到的model来创建一个对象
    var p = new Product(query);
    p.save(function(err,result){
        if(err){
            res.render('err',{data:'保存失败'});
            return;
        }
        console.log(result);
        res.redirect('/');
    });
});

// 删除数据
app.get('/del',function(req,res){
    var query = req.query;
    Product.deleteOne(query,function(err,result){
        if(err){
            res.render('error',{data:'删除失败'});
            return;
        }
        res.redirect('/');
    });
});

// 跳转到修改页面
app.get('/toUpdate',function(req,res){
    var query = req.query;
    Product.find(query,function(err,docs){
        if(err){
            res.render('error',{data:'跳转失败'});
            return;
        }
        res.render('update',{shop:docs.shift()})
    });
});

// 修改数据
app.get('/doUpdate',function(req,res){
    var query = req.query;
    var id=query.id;
    Product.updateOne({id:id},{$set:query},function(err,result){
        if(err){
            res.render('error',{data:'更新失败'});
            return;
        }
        res.redirect('/');
    });
});