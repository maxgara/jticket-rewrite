//core server functionality
const http = require('http');
const fs = require('fs')
const hostname = '0.0.0.0';
const port = 3000;
var creds = [['max','password1'],['parker','password2']];
const server = http.createServer(function(req,res){
console.log(req.url);
res.setHeader('Content-Type', 'text/html');
if(req.url=='/'){
  res.statusCode = 200;
  fs.createReadStream("index.html").pipe(res);
}
else if(req.url == '/api/login'){
  authenticate(req).then( ()=>{
    res.statusCode = 200;
    //need to create a response stream here and pipe to res (successful login)
  }).catch( () => {
    //need to create a response stream here and pipe to res (failed login)
  });
}
else{
  let resourceStr = req.url.substring(1);
  console.log(resourceStr);
  let stream = fs.createReadStream(resourceStr);
  stream.on("open", function(){
    stream.pipe(res);
    res.statusCode = 200;
  });
    stream.on("error", function(err){
      console.log(err);
      res.statusCode = 404;
      res.end();
    });
  }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function httpParseBody(req){
  return new Promise((resolve, reject) => {
    let body = [];
    req.on('data', (chunk) => {
      console.log("data start");
      body.push(chunk);
    }).on('end', () => {
      console.log("data end");
      if(body.length>0){
        body = JSON.parse(Buffer.concat(body).toString());
      }
      req.body = body;
      resolve(req);
  });
});
}
function authenticate(req){
  return new Promise((resolve,reject) => {
    httpParseBody(req).then( () => {
      let credsIn = req.body;
      console.log(credsIn);
      if(creds.includes(credsIn)){
        resolve("logged in");
      }
      else{
        reject();
      }
    });
  });
}
