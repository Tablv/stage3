const mongoose = require('mongoose');

// 暴露两个schema
// 用户相关的schema
const userSchema = new mongoose.Schema({
    username:String,    // 登录用户名
    password:String,    // 登录密码
    nickname:String,    // 昵称
    photo:{type:String,default:'/imgs/photo.jpg'}   // 头像  默认photo.jpg
});

// 留言相关的schema
const messageSchema = new mongoose.Schema({
    username:String,   //留言的用户名
    content:String,    //留言的内容
    time:{type:Date,default:Date.now}  //留言时间,默认现在
},{collection:'message'});  // 指定集合名称

// 暴露
module.exports = {
    User : mongoose.model('user',userSchema),
    Message : mongoose.model('message',messageSchema)
}