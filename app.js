
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

app.get('/', function (req, res, next) {
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
                    short_url = num_to_base62(id);
                    while (short_url.length < 5) { /* Add padding */
                        short_url = CHARS[0] + short_url;
                    }
                    url_to_index[param.query.url] = short_url;
                    short_to_url[short_url] = param.query.url;
                    id++;
                    var short_url_string = 'http://' + '127.0.0.1' + ':' + '3000' + '/' + short_url;
                    console.log(short_url_string);
                    var tempAdd = param.query.url;
                    connection.query(
                      'INSERT INTO urls (long_url, short_url) VALUES("' + tempAdd+ '","' + short_url_string + '")',
                      function(err){
                        if (err){
                          console.log(err);
                        }
                      }
                    );

                    //res.end('Your short url is: <a href="' + short_url_string +'">' + short_url_string + '</a>');
                    //res.end();
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
              
            //res.writeHead(200, {'Content-Type': 'text/html'});

              /*
                connection.query(
                  'SELECT long_url AS field1, short_url AS field2 FROM urls WHERE id= (SELECT MAX(id) FROM urls)',
                  function(err,results,fields) {
                    if (err) {
                      console.log(err);
                    } else {
                      id = results[0].ID;
                      console.log(results)
                    }
                    //connection.end();
                  })
                  */       
        
    } else { /* Redirect user to the right place */
        var long_url = short_to_url[param.pathname.substring(1)];
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