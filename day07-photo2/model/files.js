// 文件相关的操作
var fs = require('fs');
var fd = require('formidable');
var sd = require('silly-datetime');
var rf = require('rimraf');

// 读取某个文件夹的内容
// 读取文件夹是异步方法,不能使用return
// 要使用回调函数 callbask
exports.getFiles = function (dirName, callback) {
    fs.readdir(dirName, function (err, files) {
        callback(err, files);
    });
};


//处理图片的上传如重命名
exports.upload = function (req, callback) {
    var form = fd.IncomingForm();
    form.uploadDir = './';
    //解析请求
    form.parse(req, function (err, fields, files) {
        if (err) {
            callback('上传失败', null);
            return;
        }
        //改名字
        var dirName = fields.dirName;
        var pic = files.pic;
        var oldPath = pic.path;
        var oldName = pic.name;
        var ext = oldName.split('.').pop();
        //新名称
        var newName = sd.format(new Date(), 'YYYYMMDDHHmmss');
        var newPath = 'uploads/' + dirName + '/' + newName + '.' + ext;
        fs.rename(oldPath, newPath, function (err) {
            if (err) {
                callback('改名错误', null);
                return;
            }
            callback(null, '改名成功');
        });
    });
};

//新建相册
exports.newDir = function(dirName,callback){
    fs.mkdir(dirName,function(err){
        callback(err);
    });
};

//删除相册
exports.delDir = function(dirName,callback){
    rf(dirName,function(err){
        callback(err);
    });
};