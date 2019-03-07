let fs = require('fs');

//writeFile方法
let msg = '这是用writeFile方法写入的数据';

console.log(1);
fs.writeFile('./test-wirte.txt',msg,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('写入数据成功');
});
console.log(2);
// 同步方法
console.log(1);
fs.writeFileSync('./test-wirte.txt','同步方法');//返回值 undefined
console.log(2);