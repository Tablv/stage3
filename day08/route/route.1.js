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

//regist 注册方法
// exports.regist = function (req, res) {
//     //参数对象
//     var user = req.body;
//     var username = user.username;
//     var password = user.password;
//     var ptype = user.ptype;
//     var obj = {
//         username: username,
//         password: password,
//         ptype: ptype
//     };
//     var data = JSON.stringify(obj) + ';';
//     var path = './user.txt';
//     utils.uWrite(path, data, function (err) {
//         if (err) {
//             console.log(err);
//             res.send('注册失败');
//         } else {
//             res.redirect('/toLogin');
//         }
//     });
// };

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
            console.log(err);
            res.send('注册失败');
        } else {
            console.log(result.result);
            res.redirect('/toLogin');
        }
    });
}







//login 登录方法
// exports.login = function (req, res) {
//     //参数对象
//     var username = req.body.username;
//     var password = req.body.password;
//     var path = './user.txt';
//     utils.uRead(path, function (err, data) {
//         if (err) {
//             console.log(err);
//             res.send('登录失败');
//         } else {
//             //转成字符串格式
//             var userStr = data.toString();
//             var userlist = userStr.split(';');
//             userlist.pop();
//             var userObj = JSON.parse("[" + userlist.join(',') + ']');
//             // check
//             for (var i in userObj) {
//                 var user = userObj[i];
//                 if (user.username == username) {
//                     //用户名对上后,比对密码
//                     if (user.password == password) {
//                         // 密码通过
//                         var obj = {
//                             uname: user.username,
//                             ptype: user.ptype
//                         };
//                         res.render('show',obj);
//                         return;
//                     }
//                 }
//             }
//             res.redirect('/toLogin');
//         }
//     });
// };
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
            console.log(err);
            res.redirect('/toLogin');
            return;
        }
        var user = docs.shift();
        //去查寻商品goods的内容
        var mongolist1 = config.goods;
        utils.dbFind({}, mongolist1, function (err, docs) {
            if (err) {
                console.log(err);
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
    utils.dbFind({}, mongolist, function (err, docs){
        if (err) {
            console.log(err);
            return;
        }
        obj = {
            goods:docs
        }
        res.render('showgood', obj);
    });
}

// addGood 方法
exports.addGood = function (req, res) {
    //参数对象
    var gname = req.body.gname;
    var gprice = req.body.gprice;
    var gcount = req.body.gcount;
    var data = {
        gname: gname,
        gprice: gprice,
        gcount: gcount
    };
    var mongolist = config.goods;
    utils.dbInsert(data, mongolist, function (err, docs) {
        if (err) {
            console.log(err);
            res.send('进货失败');
        } else {
            res.redirect('/showGood');
        }
    });
};

// deleteGood 方法
exports.deleteGood = function(req,res){
    //获取参数
    var gid = req.query.gid;
    var filter = {
        '_id':gid
    }
    var mongolist = config.goods;
    utils.dbDelete(filter,mongolist,function(err,result){
        if(err){
            console.log('删除失败');
        }
        res.redirect('/showGood');
    });
}
