let  fs  =  require('fs');
// console.log(1)
// fs.readFile('./day04笔记.html',function(err,data){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data.toString());
//         // data是一个buffer字符流,使用toString方法可以将其转化为字符串
//     }
// });
// console.log(2)
// 同步读取文件
console.log(1)
var data = fs.readFileSync('./day04笔记.html');

console.log(data.toString());
console.log(2)