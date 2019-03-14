// 路由 
var bd = require('body-parser');
var utils = require('../model/utils.js');
//显示首页
exports.showIndex = function (req, res) {
    res.render('index');
};

//显示页面
exports.showPage = function (req, res) {
    var html = req.url.split('/to').pop();
    res.render(html);
};

//regist 注册请求
exports.regist = function (req, res) {
    //参数对象
    var user = req.body;
    var username = user.username;
    var password = user.password;
    var ptype = user.ptype;
    var obj = {
        username: username,
        password: password,
        ptype: ptype
    };
    var data = JSON.stringify(obj) + ';';
    var path = './user.txt';
    utils.uWrite(path, data, function (err) {
        if (err) {
            console.log(err);
            res.send('注册失败');
        } else {
            res.redirect('/toLogin');
        }
    });
};

//login 登录请求
exports.login = function (req, res) {
    //参数对象
    var username = req.body.username;
    var password = req.body.password;
    var path = './user.txt';
    utils.uRead(path, function (err, data) {
        if (err) {
            console.log(err);
            res.send('登录失败');
        } else {
            //转成字符串格式
            var userStr = data.toString();
            var userlist = userStr.split(';');
            userlist.pop();
            var userObj = JSON.parse("[" + userlist.join(',') + ']');
            // check
            for (var i in userObj) {
                var user = userObj[i];
                if (user.username == username) {
                    //用户名对上后,比对密码
                    if (user.password == password) {
                        // 密码通过
                        var obj = {
                            uname: user.username,
                            ptype: user.ptype
                        };
                        res.render('show',obj);
                        return;
                    }
                }
            }
            res.redirect('/toLogin');
        }
    });
};