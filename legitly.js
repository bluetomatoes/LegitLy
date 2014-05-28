(function() {
  var app, cons, exphbs, express, path;

  express = require('express');

  path = require('path');

  cons = require('consolidate');

  exphbs = require('express3-handlebars');

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

  app.get('/', function(req, res) {
    return res.render('home');
  });

  app.listen(8080);

  console.log('Your app is now running at: http://127.0.0.1:8080/');

}).call(this);
