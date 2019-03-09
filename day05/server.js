var route = require('./route.js');
var http = require('http');


var server = http.createServer(function (req, res) {
  if (req.url == '/favicon.ico') {
    return;
  }
  res.writeHead(200,{"Content-type":"text/html;charset=utf-8"})
  if(req.url == '/'){
    res.end(route.str1);
  }else if(req.url == '/info'){
    res.end(route.str2);
  }else{
    res.end(route.str3);
  }
});
server.listen(4000);

