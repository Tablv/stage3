const mongoose = require('mongoose');

// 暴露四个schema
// 用户相关的schema
const userSchema = new mongoose.Schema({
    uname:String,    // 登录用户名
    unick:String,    // 昵称
    upass:String,    // 登录密码
    utype:String,       // 用户类型
    uphoto:{type:String,default:'photo.jpg'}   // 头像  默认photo.jpg
});
// 帖子相关的schema
const cardSchema = new mongoose.Schema({
    title:String,       // 帖子名称
    content:String,     // 帖子内容
    time:String,        // 发表时间
    uname:String        // 发帖人
});
// 留言相关的schema
const messageSchema = new mongoose.Schema({
    content:String,     //留言的内容
    time:String,        //留言时间
    uname:String,       //留言人
    cid:String          //帖子id
});
// 评论相关的schema
const commentSchema = new mongoose.Schema({
    content:String,     //评论的内容
    time:String,        //留言时间
    uname:String,       //评论人
    messid:String       //留言id
});

// 暴露
module.exports = {
    dbUser : mongoose.model('user',userSchema),
    dbCrad : mongoose.model('card',cardSchema),
    dbMessage : mongoose.model('message',messageSchema),
    dbComment : mongoose.model('comment',commentSchema)
}