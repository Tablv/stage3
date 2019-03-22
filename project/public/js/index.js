
function fun(event){
    var ele = event.target;
    var path = ele.src;
    var mimg = document.querySelector('.modal-body img')
    mimg.src = path;
    console.log(path ,mimg);
}
var img = document.querySelectorAll('img');
for(var i =0; i<img.length;i++){
    img[i].addEventListener('click',fun,false);
}