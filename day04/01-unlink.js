let fs = require('fs');

fs.unlink('./test-wirte.txt',function(err){
    if(err){
        console.log(err);
    }else{
        console.log('删除成功')
    }
});