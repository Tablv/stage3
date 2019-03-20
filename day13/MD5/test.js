var md5 = require('./md5');

var password = '123';

password = md5.md5(password);

console.log(password);