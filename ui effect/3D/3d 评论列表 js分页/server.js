var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');

var server = http.createServer();

server.on('request', function(req, res) {

    var urlStr = url.parse(req.url);

    fs.readFile(__dirname + urlStr.pathname.replace('%20', ' '), function(err, data) {
        console.log(err);
        console.log(data);
        if (err) {
            res.writeHead(404, {
                'content-type': 'text/html;charset=utf-8'
            });
            res.end('<h1>页面被LEO吃掉了</h1>');
        } else {
            res.writeHead(200, {
                'content-type': 'text/html;charset=utf-8'
            });
            res.end(data);
        }

    });

});

server.listen(8080, 'localhost');
