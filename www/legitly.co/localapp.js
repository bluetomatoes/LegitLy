//TODO: wehn there is no text input redirect to home
//Host all fonts?

'use strict';

/*
*Module Dependencies
*/
var express = require('express'),
  mysql = require('mysql'),
  exphbs  = require('express-handlebars'),
  http = require('http'),
  parse = require('url').parse;

//set up the connection to mySQL database

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'alpine',
  database: 'legitly'
});
//initialize app
var app = express();

//var legitLy = createVirtualHost("www.legitly.co",'public');
//var router = createVirtualHost("www.cornellarchives.com",'cornellarchives/public')
//app.use('legitLy');
//app.use(cornellarchives);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded() );

app.get('/', function (req, res) {
    res.render('home', {
        showForm: true

    });
});

var postData = "";

app.post('/add', function(req,res){
  console.log(req.body.urlToShorten)
  postData = req.body.urlToShorten
  //var input = "http://legitly.co/add?url="+postData
  console.log(postData)
  app.locals.post=postData
  var input = "http://localhost:8080/add?url="+app.locals.post;
  res.writeHead(302,{"Location": input});
  res.end();
})

app.get('/about', function (req, res) {
  res.render('about',
  { title : 'About' }
  )
})

app.get('/404', function (req, res) {
  res.render('404',
  { title : ':(' }
  )
})

app.use('/add',function(req,res){
    var input = req.url
    console.log(input);
    var param = parse(input, true);
    console.log('we found add');
    if (param.query.url != undefined) { /* We have a url to add */
        console.log("we have a url to add: "+param.query.url);
        app.locals.long_url = param.query.url;
        /* Check whether the url has been added before */
        var short_url = ""
        var isFound;
        var found_url;
        var teachername;
        connection.query('SELECT name AS field1 FROM names ORDER BY RAND( ) LIMIT 1',function(err,results){
          if (err){
            console.log(err);
          } else {
            console.log(results[0].field1);
            teachername = results[0].field1;
          }
        })
        connection.query(
          'SELECT short_url AS thefield FROM urls WHERE long_url = "'+param.query.url+'"', 
          function(err,results, fields){
            if (err){
              console.log(err);
            } else{
              short_url = results;
              if (results != '') {
                isFound = true;
                var str = results.slice(0);
                var first = str.indexOf("'");
                var last = str.lastIndexOf("'");           
                found_url = results[0].thefield;
                console.log("it was found")
                res.render('home', { 
                  title : 'Home',
                  showForm: false,
                  helpers: { foo: function () { return found_url; } }
                });
              } else {
                isFound = false;
                console.log("not found, is found is",isFound);
                console.log("not added");
                var url_to_add = parse(param.query.url,true);
                console.log("protocol:", url_to_add.protocol)
                if (url_to_add.protocol == null) {
                  var formatting = "http://" +url_to_add.href
                  url_to_add = parse(formatting,true);
                  console.log(url_to_add);
                  console.log(url_to_add.href);
                }

                var hostname = url_to_add.hostname;
                var point1 = hostname.indexOf(".");
                var point2 = hostname.lastIndexOf(".");
                console.log("index1",point1, "index2",point2);
                var domain;
                var short_url_string;
                if (point1 == point2){
                  console.log("there's only one point, big boi")
                  domain = hostname.slice(0,point2)
                  console.log("domain:", domain)
                } else{
                  point1 = point1+1
                  domain = hostname.slice(point1,point2)
                  console.log("Le domain:", domain)
                }
                if (domain == "wikipedia"){
                    console.log("WE GOT A WIKIPEDIA ON OUR HANDS FOLKS");
                    var pathname = url_to_add.pathname;
                    var lastSlash = pathname.lastIndexOf("/");
                    var unFormattedTitle= pathname.substr(lastSlash+1);

                    var format1 = unFormattedTitle.replace(/_/g, "");
                    console.log(format1);
                    var tomato = toString(format1);
                    console.log("hey bro",format1.search(/\(/));

                    if(format1.search(/\(/) != -1){
                      var format2 = format1.slice(0,format1.indexOf("("));
                      console.log(format2);
                      var format3 = format2.toLowerCase();
                      console.log("format3" , format3);
                    } else{
                      var format3 = format1.toLowerCase();
                      console.log("format3" , format3);
                    }
                    if(format3.search(/,/) != -1){
                      var format3 = format3.replace(/,/,'');
                    }
                    short_url = format3;

                } else {
                  short_url = Math.floor((Math.random() * 9) + 1)+ "." + Math.floor((Math.random() * 9) + 1) + "." + Math.floor((Math.random() * 9) + 1);
                  console.log(Math.floor((Math.random() * 9) + 1));               
                }
                short_url_string = 'http://localhost:3030/' + teachername + '/' + short_url;
                     
                var tempAdd = url_to_add.href;
                connection.query(
                  'INSERT INTO urls (long_url, short_url) VALUES("' + tempAdd+ '","' + short_url_string + '")',
                  function(err){
                    if (err){
                      console.log(err);
                    }
                  }
                );
                res.render('home', { 
                  title : 'Home',
                  showForm: false,
                  helpers: { foo: function () { return short_url_string; } }
                });
              }
             }
           }
        )
     } 
}) 

app.use(function(req, res) {
    res.writeHead(302,{"Location": '/404'});
    res.end();
});
app.listen(8080)
console.log('Your app is now running at: http://localhost:8080');