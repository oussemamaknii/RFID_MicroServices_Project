var express = require('express');
var helmet = require('helmet');
var fs = require('fs');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var memoryStore = session.MemoryStore;
var app = express();

// set variables
var options = {
  key: fs.readFileSync('./openssl_keys/server_key.pem'),
  cert: fs.readFileSync('./openssl_keys/server_cert.pem')
};
var cookieSecret = "secret phrase";
var sessionStore = new memoryStore();

app.set('env', process.env.NODE_ENV || 'development');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser(cookieSecret));
app.use(session({
    secret: cookieSecret,
    cookie: {httpOnly: true, secure: true},
    store: sessionStore
}));
app.use(function(req, res, next){
    res.locals.session = req.session;
    next();

});
app.use(express.static(path.join(__dirname, 'public')));

//routes
require('./routes/index')(app);
require('./routes/test')(app);


// starting http and https servers
var http = require('http').createServer(app).listen(8000, function(){
    console.log("http server listening on port 8000");
});
var https = require('https').createServer(options, app).listen(8080, function(){
    console.log("https server listening on port 8080"); 
});

// starting socket.io & session handler
var serverIO = require('socket.io').listen(https);
var SessionSockets  = require('session.socket.io-express4');
var io = new SessionSockets(serverIO, sessionStore, cookieParser);

io.on('connection', function(err, socket, session){
    if(err) throw err;
    console.log("connected");
    //console.log(session);
    socket.on('clientMessage', function(content) {
        console.log("received client message")
        console.log(content);
    });

});

module.exports = app;