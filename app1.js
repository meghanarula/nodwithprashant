const express= require("express");

const server= express();

server.get('/',function(req,res) {
    res.send('hello');
})
server.get('/login',function(req,res){
    res.send('login here');
})


 
server.listen(8000,function(){
    console.log('serever started at port 8000');
})