var gm = require('gm');



gm('./a.jpg')
// .flip()  //垂直翻转
// // .magnify()   //尺寸翻倍
// // .rotate('green',45)  //旋转45度,空白填充为绿色
// // .blur(9,9)   //模糊效果
// // .crop(300,300,150,130)   //剪切
.edge(3) 
.write('./b.jpg',function(err){
    console.log(err);
})

// gm('/path/to/my/img.jpg')
// .stroke("#ffffff")
// .drawCircle(10, 10, 20, 10)
// .font("Helvetica.ttf", 12)
// .drawText(30, 20, "GMagick!")
// .write("/path/to/drawing.png", function (err) {
//   if (!err) console.log('done');
// });