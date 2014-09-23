//TODO: wehn there is no text input redirect to home
'use strict';

/*
*Module Dependencies
*/

var express = require('express'),
  mysql = require('mysql'),
  exphbs  = require('express3-handlebars'),
  http = require('http'),
  parse = require('url').parse

//set up the connection to mySQL database

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'alpine',
  database: 'legitly'
});

//initialize app
var app = express();

var id = 0; /* You can start from a non-zero seed */
var url_to_index = new Array();
var short_to_url = new Array();


var short_to_html ="";


/* Randomize CHARS if you dont want people to guess the next url generated */
var CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHUJKLMNOPQRSTUVWXYZ';
 
function num_to_base62(n) {
    if(n > 62) {
        return num_to_base62(Math.floor(n / 62)) + CHARS[n % 62];
    } else {
        return CHARS[n];
    }
}



app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.logger('dev'))

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
  //var input = "http://127.0.0.1:3000/add?url="+postData
  console.log(postData)
  app.locals.post=postData
  var input = "http://127.0.0.1:3000/add?url="+app.locals.post;
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

app.use(function(req,res){
    var input = req.url
    console.log(input);
    var param = parse(input, true);
    if (param.pathname == '/add') {
        console.log('we found add');
        if (param.query.url != undefined) { /* We have a url to add */
            console.log("we have a url to add: "+param.query.url);
            app.locals.long_url = param.query.url;
            /* Check whether the url has been added before */
            var short_url = ""
            var isFound;
            var found_url;
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
                    //console.log("Doink",results[0].field1)
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
                      
                    }else{
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

                          //TODO: Remove commas from url
                          //
                          short_url = format3;
                          short_url_string = 'http://' + '127.0.0.1' + ':' + '8080' + '/' + short_url;
                      } else {
                        short_url = num_to_base62(id);
                        while (short_url.length < 5) { /* Add padding */
                            short_url = CHARS[0] + short_url;
                        }
                        url_to_index[param.query.url] = short_url;
                        short_to_url[short_url] = param.query.url;
                        id++;
                        short_url_string = 'http://' + '127.0.0.1' + ':' + '8080' + '/' + short_url;
                        console.log("short_url_string");                    
                      }

                      var tempAdd = param.query.url;
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
               }
            )
         } 
    } else { /* Redirect user to the right place */
        var long_url = app.locals.long_url
        if (long_url != undefined) {
            res.writeHead(302, {'Location': long_url});
            res.end();
        } else {
           res.writeHead(302,{'Location': "/404"})
           res.end();
        }
    }
}) 

app.listen(3000)
console.log('Your app is now running at: http://127.0.0.1:3000/');