//引入http
let http = require('http');
//引入fs(file system)
let fs = require('fs');

//创建服务
let server = http.createServer(function(req,res){
    // res.end(); //结束请求,但是没有返回数据
    // console.log(this);
    //使用fs读取某个页面
    // readFile(文件路径,回调函数)
    fs.readFile('./day03笔记.txt',function(err,data){
        // err:读取文件出错时的错误信息
        // data:正确读取到了文件的数据
        if(err){
            console.log(err);
            //如果出错了,通知浏览器,读取数据失败
            res.end("your page is not found!");
        }else{
            // 设置响应头
            res.writeHead(200,{"Content-Type":"text/plain;charset=utf-8"});
            //没有出错,返回读取到的数据
            res.end(data);
        }
    });
});

//开启服务,监听端口
server.listen(4000);