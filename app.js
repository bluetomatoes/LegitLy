/*
*Module Dependencies
*/

var express = require('express'),
  mysql = require('mysql'),
  exphbs  = require('express3-handlebars'),
  http = require('http'),
  parse = require('url').parse

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'alpine',
  database: 'legitly'
});

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.logger('dev'))

app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render('home',
  { title : 'Home' }
  )
})
app.get('/about', function (req, res) {
  res.render('about',
  { title : 'About' }
  )
})


 connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

   console.log('connected as id ' + connection.threadId);
 });
//var sql = 'INSERT INTO legitly (' +

 //connection.query(err, sql) {
 // if (err) throw err;
// });


app.listen(3000)
console.log('Your app is now running at: http://127.0.0.1:3000/');