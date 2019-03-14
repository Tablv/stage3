//  路由,这里专门处理请求,这里有各种请求的具体处理
var file = require('../model/files.js');

//  暴露几个方法
//  处理  / 请求,显示首页
// app.js ----> showIndex ---->file.getFiles(---> (fs.readdir(异步方法)---回调函数()) ---> callback()回调函数) 
// 因为在这里,进行赋值操作时,异步方法会导致变量 还没进行初始化,就已经被调用了
// 所以,将结果直接从 异步方法 中返回,使用回调,是可以 对异步方法的结果 在这里就可以进行规定,改变
// 回调函数,就是将  对结果数据的处理(函数体)  扔给异步方法
// 异步:先通知,已经接到了调用命令,自己执行,等执行完成后,结果怎么处理?这里通过回调(就是调用者设定好的:处理被调用者结果的函数)
exports.showIndex = function (req, res) {
    //调用file的getFiles方法,获取结果
    file.getFiles('./uploads', function (err, files) {
        if (err) {
            console.log(err);
            res.send("展示首页 出错");
        } else {
            res.render('index', {
                dirs: files
            });
        }
    });
}

//toUpload,跳转到上传页面
exports.toUpload = function (req, res) {
    //读取当前有哪些相册(文件夹)
    file.getFiles('./uploads', function (err, files) {
        if (err) {
            res.send('获取数据失败');
        } else {
            res.render('upload', {
                dirs: files
            });
        }
    });
};

//doUpload  上传图片
exports.doUpload = function (req, res) {
    //获取参数
    file.upload(req, function (err, msg) {
        if (err) {
            console.log(err);
            res.send('上传失败');
            return;
        }
        // 上传成功,改名成功
        res.redirect('/');
    });
};

// toNewDir 跳转到新建相册页面
exports.toNewDir = function (req, res) {
    res.render('newdir');
};

// doCreateDir 新建相册
exports.doCreateDir = function (req, res) {
    //获取文件夹名字
    var dirName = 'uploads/' + req.body.dirName;
    file.newDir(dirName, function (err) {
        if (err) {
            console.log(err);
            res.send('创建失败');
            return;
        }
        res.redirect('/');
    });
}

//showPic 显示文件夹中的内容
exports.showPic = function (req, res) {
    var dirName = req.params.dirName;
    file.getFiles('uploads/' + dirName, function (err, files) {
        if (err) {
            console.log(err);
            res.send('获取图片失败');
        } else {
            res.render('show', {
                pics: files,
                dirName: dirName
            });
        }
    });
};

//deleteDir 删除文件夹
exports.deleteDir = function (req, res) {
    var dirName = req.query.dirName;
    dirName = 'uploads/' + dirName;
    file.delDir(dirName, function (err) {
        if (err) {
            console.log(err);
            res.send('删除失败');
        } else {
            res.redirect('/');
        }
    });
}