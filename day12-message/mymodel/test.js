var db= require('./db.js');  // 数据库操作
var schema = require('./schemas.js'); // 数据库操作对象

// var User = schema.User;
// var Message = schema.Message;

// module.exports.mymodel = {
//     db:db,
//     schema:schema
// }
exports.db=db;
exports.schema=schema;

// 添加一个用户

// var json = {
//     username:'wangwu',
//     password:'123',
//     nickname:'王五'
// };

// db.add(User,json,function(err,result){
//     console.log(err,result);
// });

// 添加一条留言信息
// var json = {
//     username:'zhangsan',
//     content:'王五来了'
// };
// db.add(Message,json,function(err,result){
//     console.log(err,result);
// });

//删除一条留言信息
// var json = {
//     content:'王五来了'
// };
// db.del(Message,json,function(err,result){
//     console.log(err,result);
// });
//修改一个留言信息
/*var json = {
    username:'zhangsan'
};
var data = {
    content:'王五走了',
    time:Date.now()
}
db.update(Message,json,data,function(err,result){
    console.log(err,result);
});
*/
// 删除一条数据
// db.find(User,{username:'wangwu',limit:2},function(err,docs){
//     console.log(err,docs);
// });










































// var schema = require('./schemas.js');
// var mongoose = require('mongoose');
// var config = require('./db.config.js');

// var User = schema.User;
// var Message = schema.Message;

//创建user对象
// var u = new User({
//     username:'zhangsan',
//     password:'123',
//     nickname:'张三'
// });
//常见 message 对象
// var m = new Message({
//     username:'zhangsan',
//     content:'我是张三,我来自上海.'
// });

// mongoose.connect(config.url,{useNewUrlParser:true});

// 保存数据库
// u.save(function(err,result){
//     console.log(err,result);
// })
// m.save(function(err,result){
//     console.log(err,result);
// });