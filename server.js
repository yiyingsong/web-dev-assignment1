const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const secret = !!process.env.SESSION_SECRET ? process.env.SESSION_SECRET : 'local_secret';
app.use(cookieParser());
app.use(session({ secret: secret}));


app.use(passport.initialize());

app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist/web-dev-assignment1')));

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

const port = process.env.PORT || '3200';
app.set('port', port);


// Create HTTP server
const server = http.createServer(app);

require('./assignment/app.js')(app);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/web-dev-assignment1/index.html'));
});

server.listen( port , () => console.log('Running on port 3200'));

// const connectionString = 'mongodb://127.0.0.1:27017/webdev'; for local testing
const connectionString = 'mongodb://sophie:Sophie1108@ds121406.mlab.com:21406/heroku_3m3js2gz';
let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const client = mongoose.connect( connectionString, { useNewUrlParser: true });



