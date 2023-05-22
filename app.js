const http = require('http');

http.createServer(function(req,res){

res.write("On the way to fullstack engineering!!!");
res.end();


}
).listen(3000);

console.log("Server started at port 3000");

