// 使用mongoose 封装对数据库的增删该查的操作
// 引入mongoose,db.config.js
const mongoose = require('mongoose');
const config  = require('./db.config.js');

const url = config.url;

// 连接数据库
mongoose.connect(url,{useNewUrlParser:true});
// 暴露add方法,向某个集合中添加数据
/** 
 * @method 添加数据
 * @param {object} Obj 通过schema编译而成的model对象
 * @param {Json} json  创建对象是用到的数据
 * @param {function} callback  回调函数
*/
exports.add = function(Obj,json,callback){
    // 创建对象
    var o = new Obj(json);
    // 保存对象
    o.save(function(err,result){
        callback(err,result);
    });
}
//暴露del方法,向某个集合中删除数据
/** 
 * @method 删除数据
 * @param {object} Obj 通过schema编译而成的model对象
 * @param {Json} filter  要删除的记录的条件
 * @param {function} callback  回调函数
*/
exports.del = function(Obj,filter,callback){
    // 执行删除 remove deleteone deletemany
    Obj.deleteOne(filter,function(err,result){
        callback(err,result);
    });
}
//暴露update方法,向某个集合中修改数据
/** 
 * @method 修改数据
 * @param {object} Obj 通过schema编译而成的model对象
 * @param {Json} filter  查找修改记录的条件
 * @param {Json} data    要修改的数据
 * @param {function} callback  回调函数
*/
exports.update = function(Obj,filter,data,callback){
    // 执行修改 update updateone updatemany
    Obj.update(filter,{$set:data},function(err,result){
        callback(err,result);
    });
}
//暴露find方法,向某个集合中查找数据
/** 
 * @method 查找数据
 * @param {object} Obj 通过schema编译而成的model对象
 * @param {Json} option  可选参数 可以是查询条件,也可以是skip与limit
 * @param {function} callback  回调函数
*/
exports.find=function(Obj,filter,callback){
    // 限制条件 可选参数对象
    var option = {};
    // 不管filter是不是function,都可以直接去拿属性,有就是有,没有就是没有
    option.limit = filter.limit || 0;
    option.skip = filter.skip || 0;
    if(typeof option == 'function'){  // 当filter是函数是,option当然拿不到属性
       callback = filter;   // 将filter 给 callback
       filter = {};         // filter 置空
    }
    delete filter.limit;    // 不管有没有 干掉 limit
    delete filter.skip;     // 干掉 skip
    Obj.find(filter,{},option,function(err,docs){
        callback(err,docs);
    });
};