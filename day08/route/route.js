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


// 封装数据库处理方法,错误err在这里统一处理
// data: data.filter查询/删除/修改的条件/插入的数据 ,data.data 修改的数据
// mongolist : 数据库连接信息
// oper: 要执行的操作
// callback : 回调函数
// redirectUrl : 操作执行出错式,返回的页面
function getDbOper(data,mongolist,Oper,callback,redirectUrl){
    utils[Oper](data.filter,mongolist, function (err, result) {
        if (err || result.length == 0) {
            console.log(Oper +": 执行失败" + err);
            if(redirectUrl){
                res.redirect(redirectUrl);
            }
            return;
        }
        callback(result);
    },data.data);
}



//重写regist方法
exports.regist = function (req, res) {
    //参数对象
    var data = {
            filter:req.body
    }; 
    //调用插入方法
    getDbOper(data,config.user,'dbInsert',function(result){
        res.redirect('/toLogin');   //注册成功跳转登录页面
    });
}


//login 登录方法
//重写 login 方法
exports.login = function (req, res) {
    //查询条件
    var data = {
        filter :req.body
    };
    var redirectUrl = '/toLogin';      //登录失败后,跳转的地址
    //调用查找方法  查找 user集合
    getDbOper(data,config.user,'dbFind',function(docs){
        var user = docs.shift();       //拿查询结果的第一项
        //调用查找方法  查找 user集合
        getDbOper({filter:{}},config.goods,'dbFind',function(doc){
            obj = {
                'uname': user.username,// 用户名
                'ptype': user.ptype,   // 用户身份
                'goods': doc           // 展示的信息
            };
            res.render('show', obj);   //将最后的结果,返回到展示界面
        });
    },redirectUrl);
};

// 处理 /showGood 请求,去数据库下发对goods的查询请求
exports.showGood = function (req, res) {
    // filter 查询条件
    var data = {
        filter:req.query   // 查询条件,直接拿参数来当做查询条件
    }
    if (JSON.stringify(data.filter) != '{}') {  // 如果filter不是空对象
        data.filter._id = data.filter.gid;           // 将对象中的 gid 属性替换成 _id
        delete data.filter.gid;                 // 删掉 gid
    }
    // 调用查找方法 查找 goods集合
    getDbOper(data,config.goods,'dbFind',function(docs){
        var obj = {                        // 返回的数据
            goods: docs
        }
        if (JSON.stringify(data.filter) != '{}') {  
            res.render('updateGood', obj); // 单个数据,发给更新页面
        } else {
            res.render('showgood', obj);   // 如果条件是空对象,那么就是展示页面发出的请求
        }
    });
};

// addGood 方法
exports.addGood = function (req, res) {
    var data ={
        filter:req.body                 // 插入数据
    };
    // 调用 插入 方法
    getDbOper(data,config.goods,'dbInsert',function(result){
        res.redirect('/showGood');      // 插入成功 跳转到 展示界面
    });
};

// deleteGood 方法
exports.deleteGood = function (req, res) {
    //获取参数
    var data = {                        //删除的条件
        filter:{'_id': req.query.gid}
    }
    // 调用 删除 方法
    getDbOper(data,config.goods,'dbDelete',function(result){
        res.redirect('/showGood');      //删除成功 跳转登录界面
    });
}

// updateGood 方法
exports.updateGood = function (req, res) {
    //获取参数
    var data = {
        filter:{_id: req.body.gid}      //修改数据的条件
    };
    delete req.body.gid;                //删除gid
    data.data = {                       //更新的数据
        $set:req.body
    };
    // 调用 修改 方法 
    getDbOper(data,config.goods,'dbUpdate',function(result){
        res.redirect('/showGood');      //更新成功 跳转到登录界面
    });
}