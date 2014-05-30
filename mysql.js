var http = require('http');
var mysql = require('mysql'); 

var connection = mysql.createConnection({ 
    user: "root", 
    password: "purpledemon", 
    database: "legitly"
}); 
 
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
  req.on('end', function () { 
        // Query the database. 
        console.log("request function loaded");
        connection.query('SELECT * FROM legitly;', function (error, rows, fields) { 
            res.writeHead(200, { 
                'Content-Type': 'text/plain' 
            }); 
            // Send data as JSON string. 
            // Rows variable holds the result of the query. 
            str = "Here:"
            res.end(str.concat(rows)); 
            console.log("sent as json");
        }); 
    }); 
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');