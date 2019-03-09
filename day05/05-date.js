//引用下载的 silly-datetime 模块


var sd = require('silly-datetime');

var str = sd.format(new Date(),'YYYY年MM月DD日 HH时mm分ss秒');
console.log(str);

//引入fecha模块
var fc = require('fecha');
var str = fc.format(new Date(),'YYYY年M月D日 HH时mm分ss秒 A');
console.log(str);




