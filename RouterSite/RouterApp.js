'use strict';

/*
*Module Dependencies
*/

var express = require('express'),
  mysql = require('mysql'),
  http = require('http'),
  parse = require('url').parse
// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var request = require('request');

//set up the connection to mySQL database

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'alpine',
  database: 'legitly'
});

//initialize app
var app = express();


app.use(express.logger('dev'))

app.use(express.urlencoded() );

function PostCode(codestring) {
  // Build the post string from an object
  var post_data = querystring.stringify({
      'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
      'output_format': 'json',
      'output_info': 'compiled_code',
        'warning_level' : 'QUIET',
        'js_code' : codestring
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: '127.0.0.1',
      port: '3000',
      path: '/add',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': post_data.length
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(codestring);
  post_req.end();
}

//PostCode("http://en.wikipedia.org/wiki/Haakon_Ericsson");

app.get('/', function (req, res) {
  //res.writeHead(200, {'Content-Type': 'text/plain' });
  //res.send("Welcome to this shitty site.");
	res.writeHead(302,{"Location":"http://127.0.0.1:3000"});
	res.end();

});

app.post('http://127.0.0.1:3000/add', function(req, res){    
    var postData = "dude it worked!!!!"
    console.log(postData)
})

var isFound;
app.use(function(req,res){
  var param = parse(req.url, true);
  console.log(param.pathname);
  connection.query(
    'SELECT long_url AS thefield FROM urls WHERE short_url = "http://127.0.0.1:8080'+param.pathname+'"', 
    function(err,results, fields){
      if (err){
        console.log(err);
      } else{
        console.log(results[0]);
        //short_url = results;
        if (results != '') {
          isFound = true;
          var str = results.slice(0);
          var first = str.indexOf("'");
          var last = str.lastIndexOf("'");
          
          var found_url = results[0].thefield;
          console.log("Doink",results[0].thefield)
          console.log("it was found")
          res.writeHead(302,{'Location': results[0].thefield});
          res.end();
        } else {
          console.log("not found :(");
        }
    }
  })
})


app.listen(8080)
console.log('Your app is now running at: http://127.0.0.1:8080/');