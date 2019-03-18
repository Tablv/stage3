// 引入mongoose
var mongoose = require('mongoose');

// 创建一个student类的schema  mongoose.Schema(参数是一个对象)
var stuSchema = new mongoose.Schema({
    id:String,
    name:String,
    sex:String
});

// 通过Schema创建一个对象
// 创建model模型,参数
// 1:对应数据库集合中的名称(实际到数据库创建的集合名会加上s ==> stus)
// 2:Schema
var stu = mongoose.model('stu',stuSchema);
// 创建对象
var s1 = new stu({
    id:'1002',
    name:'李四',
    sex:'M'
});

// 连接数据库
// 比mongo模块的url多了一层  数据名称
var url = 'mongodb://localhost:27017/web'

mongoose.connect(url,{useNewUrlParser:true});

// 连接成功后,进行增删该查
// 增加
// s1.save(function(err,stu){
//     //参数stu:表示添加的数据
//     console.log(err,stu);
// });

// 查询
// 通过schema创建的model查询某个集合中的数据
// stu.find(function(err,docs){
//     console.log(err,docs);
// });

// 修改
// 通过schema创建的model修改某个集合中的数据
// 参数
// 1:修改的条件 2:修改的数据  3:回调函数
stu.updateOne({id:'1002'},{$set:{sex:'F'}},function(err,result){
    console.log(err,result);
});

// 删除
// 通过schema创建的model删除某个集合中的数据
// 参数
// 1:删除的条件  2:回调函数
stu.deleteOne({},function(err,result){
    console.log(err,result);
});