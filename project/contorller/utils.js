// 一些乱七八糟的方法
var crypto = require('crypto');
// check方法
/** 
 * @method 验证参数
 * @param  {string} input 需要验证的输入数据
 * @param  {string} checked 正确的数据
*/
exports.checkout = function(input,checked){
    var obj = {
        'status':true,
        'msg':'验证通过'
    }
    if(input != checked){
        obj.msg = '验证不通过';
        obj.status = false;
    }
    return obj;
}

// encryption 方法
/**
 * @method 加密方法
 * @param  {string} arg 也要加密的参数
 */
exports.encryption = function(arg){
    var pass = crypto.createHash('md5').update(arg).digest('base64');
    var salt = 'woailvchangjie';
    pass = pass.substring(3,15);  // 截取一段
    pass += salt;    // 加盐
    // 第二次加密
    pass = crypto.createHash('md5').update(pass).digest('base64');
    return pass;
}