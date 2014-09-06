'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'alpine'
});

var database = 'legitly'
connection.query('USE ' + database, function(err){
	if (err){
		console.log("could not use database '" + database + "'");
	}
});

connection.query('CREATE TABLE urls' +
				 '(id INT(11) AUTO_INCREMENT, ' +
				 ' long_url VARCHAR(255), ' + 
				 ' short_url VARCHAR(255), ' +
				 ' PRIMARY KEY(id))',
	function(err) {
		if (err) {
			console.log("could not create table 'urls'.");
		}
	}
);

//connection.query('INSERT INTO urlstest (long_url,short_url) VALUES("Hello","World")');

connection.end();
