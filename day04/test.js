let fs = require('fs');

fs.readdir('./', function (err, files) {
    if (err) {
        console.log(err);
        return;
    }
    //使用自调函数遍历files
    (function iterate(i) {
        //先制定自调函数结束的条件
        if (i >= files.length) {
            console.log('遍历结束');
            return;
        }
        fs.stat(files[i], function (err, stats) {
            if (err) {
                console.log(err);
                return;
            }
            if (stats.isDirectory()) {
                console.log(files[i], "这是一个文件夹");
            }
            if (stats.isFile()) {
                console.log(files[i], "这是一个文件");
            }
            iterate(++i);
        });
    })(0);
    // for (var i = 0; i < files.length; i++) {
    //     var fun = function (i) {
    //         fs.stat(files[i],
    //             function (err, stats) {
    //                 if (err) {
    //                     console.log(err);
    //                     return;
    //                 }
    //                 if (stats.isDirectory()) {
    //                     console.log(files[i], "这是一个文件夹");
    //                 }
    //                 if (stats.isFile()) {
    //                     console.log(files[i], "这是一个文件");
    //                 }
    //             });
    //     };
    //     fun(i);
    // }

});