var crypto = require('crypto');
/**
 * 加密
 * @param {string} str 传入的明文密码
 * @returns {string} str 返回的加密密码
 */
exports.md5 = function(str){
    var pass = crypto.createHash('md5').update(str).digest('base64');
    var salt = 'www.baidu.com';
    pass = pass.substring(3,15);  // 截取一段
    pass += salt;    // 加盐
    // 第二次加密
    pass = crypto.createHash('md5').update(pass).digest('base64');
    return pass;
}