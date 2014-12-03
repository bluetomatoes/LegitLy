var express = require('express'); 
var app = express(); 
var vhost = require('vhost');
var cornellarchives = require('./cornellarchives.com/app.js').app,
	legitly = require('./legitly.co/app.js').app;
 
app.use(vhost('cornellarchives.com', cornellarchives));
app.use(vhost('legitly.co', legitly));

app.listen(3030); 
