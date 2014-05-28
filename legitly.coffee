express = require 'express'
path = require 'path'
cons = require 'consolidate'
exphbs = require 'express3-handlebars'
mysql = require 'mysql'

#create our express app
app = express()

app.engine('handlebars', exphbs(defaultLayout: 'main'))
app.set('view engine', 'handlebars')

 #setup our app to use handlebars.js for templating
app.set 'views', path.join __dirname, 'views' 
#add some standard express middleware
app.configure () -> 
	### 'default', 'short', 'tiny', 'dev' ###
	app.use express.logger 'dev' 
	app.use express.bodyParser()
	app.use express.cookieParser()
	app.use express.static 'static'
#mysql connection
connect = mysql.createConnection(
	user: "root",
	password: "",
	database: "db_name"
)
#routes
app.get '/', (req, res) -> 
	res.render 'home'
	req.on 'end', () ->  
        # Query the database. 
        connection.query 'SELECT * FROM your_table;',  (error, rows, fields) -> 
            res.writeHead 200, { 
                'Content-Type': 'x-application/json' 
            } 
            # Send data as JSON string. 
            # Rows variable holds the result of the query. 
            res.end JSON.stringify rows 
#have our app listen on port 8080
app.listen 8080
console.log 'Your app is now running at: http://127.0.0.1:8080/'