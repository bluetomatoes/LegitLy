(function() {
  var app, connect, cons, exphbs, express, mysql, path;

  express = require('express');

  path = require('path');

  cons = require('consolidate');

  exphbs = require('express3-handlebars');

  mysql = require('mysql');

  app = express();

  app.engine('handlebars', exphbs({
    defaultLayout: 'main'
  }));

  app.set('view engine', 'handlebars');

  app.set('views', path.join(__dirname, 'views'));

  app.configure(function() {
    /* 'default', 'short', 'tiny', 'dev'*/

    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    return app.use(express["static"]('static'));
  });

  connect = mysql.createConnection({
    user: "root",
    password: "",
    database: "db_name"
  });

  app.get('/', function(req, res) {
    res.render('home');
    return req.on('end', function() {
      return connection.query('SELECT * FROM your_table;', function(error, rows, fields) {
        res.writeHead(200, {
          'Content-Type': 'x-application/json'
        });
        return res.end(JSON.stringify(rows));
      });
    });
  });

  app.listen(8080);

  console.log('Your app is now running at: http://127.0.0.1:8080/');

}).call(this);
