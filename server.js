var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var httpServer = require("http").createServer(app);
var userRoute = require('./routes/user');
var dayRoute = require('./routes/day');
var templateRoute = require('./routes/template');
var timeDimensionRoute = require('./routes/timeDimension');
var connection = require('./config/connection');

// set our port
var port = 3000;

// parse application/json 
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: true
}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

//set the public folder of the app
app.use(express.static(__dirname + '/public'));

//load basic route for server
require('./routesServer/index')(app);
require('./routesServer/auth')(app);

// startup our app at http://localhost:3000
httpServer.listen(port);
connection.init();
userRoute.configure(app);
dayRoute.configure(app);
templateRoute.configure(app);
timeDimensionRoute.configure(app);

// shoutout to the user                     
console.log('Server available at http://localhost:' + port);
// expose app           
exports = module.exports = app;