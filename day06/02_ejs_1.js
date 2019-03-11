// 引入ejs
let ejs = require('ejs');

//模拟数据
var msg = 'ejs';

//创建模板

var template = '今天开始学习<%= data %>';

//调用ejs的render方法,填充模板
// 第一个参数是一个字符串,表示模板,第二参数是一个对象,表示填入模板的数据
// 有返回值
var html = ejs.render(template,{data:msg});
console.log(html)