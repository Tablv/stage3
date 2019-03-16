// 路由 
var utils = require('../model/utils.js');
var config = require('../sourcedb/config.js');
//显示首页
exports.showIndex = function (req, res) {
    res.render('index');
};
//显示页面
exports.showPage = function (req, res) {
    var html = req.url.split('/to').pop();
    res.render(html);
};

//重写regist方法
exports.regist = function (req, res) {
    //参数对象
    var username = req.body.username;
    var password = req.body.password;
    var ptype = req.body.ptype;
    var data = {
        username: username,
        password: password,
        ptype: ptype
    };
    var mongolist = config.user;
    utils.dbInsert(data, mongolist, function (err, result) {
        if (err) {
            console.log("dbInsert:"+err);
            res.send('注册失败');
        } else {
            console.log("dbInsert:"+result.result);
            res.redirect('/toLogin');
        }
    });
}

//login 登录方法
//重写 login 方法
exports.login = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var filter = {
        username: username,
        password: password
    }
    var mongolist = config.user;
    utils.dbFind(filter, mongolist, function (err, docs) {
        if (err || docs.length == 0) {
            console.log("dbFind:"+err);
            res.redirect('/toLogin');
            return;
        }
        var user = docs.shift();
        //去查寻商品goods的内容
        var mongolist1 = config.goods;
        utils.dbFind({}, mongolist1, function (err, docs) {
            if (err) {
                console.log("dbFind"+err);
                return;
            }
            obj = {
                'uname': user.username,
                'ptype': user.ptype,
                'goods': docs
            };
            res.render('show', obj);
        });

    });
};

// 处理 /showGood 请求,去数据库下发对goods的查询请求
exports.showGood = function(req,res){
    var mongolist = config.goods;
    // filter 查询条件
    var filter = req.query;
    if(JSON.stringify(filter) != '{}'){
        filter._id = filter.gid;
        delete filter.gid;
    }
    utils.dbFind(filter, mongolist, function (err, docs){
        if (err) {
            console.log("dbFind"+err);
            return;
        }
        var obj = { goods:docs}
        if(JSON.stringify(filter) != '{}'){
            res.render('updateGood',obj);
        }else{
            res.render('showgood', obj);
        }
    });
}

// addGood 方法
exports.addGood = function (req, res) {
    //参数对象
    var data = {
        gname: req.body.gname,
        gprice: req.body.gprice,
        gcount: req.body.gcount
    };
    var mongolist = config.goods;
    utils.dbInsert(data, mongolist, function (err, docs) {
        if (err) {
            console.log("dbInsert"+err);
            res.send('进货失败');
        } else {
            res.redirect('/showGood');
        }
    });
};

// deleteGood 方法
exports.deleteGood = function(req,res){
    //获取参数
    var filter = {
        '_id':req.query.gid
    }
    var mongolist = config.goods;
    utils.dbDelete(filter,mongolist,function(err,result){
        if(err){
            console.log('删除失败');
        }
        res.redirect('/showGood');
    });
}

// updateGood 方法
exports.updateGood = function(req,res){
    //获取参数
    var filter = {
        _id :req.body.gid
    }
    delete req.body.gid;
    var data = {
        $set:req.body
    };
    var mongolist = config.goods;
    utils.dbUpdate(filter,data,mongolist,function(err,result){
        if(err){
            console.log("dbUpdate:"+err);
            return;
        }
        res.redirect('/showGood');
    });
}
   