// crypto 加密模块
var crypto = require('crypto');
var fs = require('fs');
// 明码  
/*var password = '123123..';
// 加密
var pass = crypto.createHash('MD5').update(password).digest('base64');

console.log(pass);*/

fs.readFile('./day13.txt',function(err,data){
    console.log(err);
    console.log(data.toString());
    var pass = crypto.createHash('md5').update(data).digest('base64');
    console.log(pass);
})