/*
 * Pirple HW 2
 *
 */

const http  = require('http');
const url   = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

let server = http.createServer(function(req,res){
    let parsedUrl = url.parse(req.url,true);
    let path = parsedUrl.pathname.replace(/^\/+|\/+$/g,'');
    let decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data',function(data){
        buffer += decoder.write(data);
    });
    req.on('end',function(){
        buffer += decoder.end();
        //Choose handler
        let handler = typeof (router[path]) !== 'undefined' ? router[path] : handlers.notFound;
        let data = {
            path    : path,
            method  : req.method.toLowerCase(),
            query   : parsedUrl.query,
            headers : req.headers,
            payload : buffer
        }
        handler(data,function(statusCode,payload){
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            payload = typeof(payload) == 'object' ? payload : {};
            res.setHeader("Content-Type", "application/json");
            res.writeHead(statusCode);
            res.end(JSON.stringify(payload));
        });
    });
}, 3000);

server.listen(3000,function(){
    console.log("The server is listening on port 3000!");
});

let handlers = {};

handlers.hello = function(data,callback){
    //Callback a http status code, and a payload Object
    callback(200, {msg : "Hello, I'm the Homework 2!"});
};
handlers.notFound = function(data,callback){
    callback(404);
};

let router = {
    hello : handlers.hello
}
