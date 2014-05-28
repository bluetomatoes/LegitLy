express = require 'express'
path = require 'path'
cons = require 'consolidate'
exphbs = require 'express3-handlebars'

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
 
#routes
app.get '/', (req, res) -> 
	res.render 'home'

#have our app listen on port 8080
app.listen 8080
console.log 'Your app is now running at: http://127.0.0.1:8080/'