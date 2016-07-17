var express = require('express');
var app = express();

var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var config = require('config');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('S3CRE7'));
app.use(session({ secret: 'S3CRE7-S3SSI0N', saveUninitialized: true, resave: true } ));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'site')));

//routes
var routes = require('./routes/index');
var play = require('./routes/play');

app.use('/',routes);
app.use('/play',play);

//launch server
var server = require('http').createServer(app).listen(8000,function(){
	console.log('Server listening at port : 8000');
});

require('./config/socket.js')(server);

module.exports = app;