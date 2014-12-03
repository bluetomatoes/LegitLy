'use strict';

/*
*Module Dependencies
*/

var express = require('express'),
  mysql = require('mysql'),
  http = require('http'),
  parse = require('url').parse

//set up the connection to mySQL database
var connection = mysql.createConnection({
  host: '104.236.2.171',
  user: 'root',
  password: 'alpine',
  database: 'legitly'
});

//initialize app
var app = exports.app = express(); 
//set encoding type
app.use(express.urlencoded() );

app.get('/', function (req, res) {
 // res.writeHead(200, {'Content-Type': 'text/html' });
	res.writeHead(302,{"Location":"http://legitly.co"});
	res.end();
});

app.post('http://legitly.co/add', function(req, res){    
    //var postData = "dude it worked!!!!"
    //console.log(postData)
})

var isFound;
app.use(function(req,res){
  var param = parse(req.url, true);
  console.log(param.pathname);
  connection.query(
    'SELECT long_url AS thefield FROM urls WHERE short_url = "http://cornellarchives.com'+param.pathname+'"', 
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
console.log('Your app is now running at: http://cornellarchives.com:80/');
