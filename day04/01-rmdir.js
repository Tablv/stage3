let fs = require('fs');

fs.rmdir('./a',function(err){
    if(err){
        console.log(err);
    }else{
        console.log('删除成功');
    }
});