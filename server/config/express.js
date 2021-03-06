var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    session = require('express-session'),
    authenticationRouter = require("../routes/authenticate.router");
    transactionRouter = require("../routes/transaction.router");

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  app.use(session({
    secret: "golden apple",
    resave: true,
    saveUninitialized: false
  }));

  //body parsing middleware 
  app.use(bodyParser.json());

  
  /* Serve static files */
  app.use('/', express.static('client'));

  /*Route requests to [url]/api/authenticate towards our authentication system */
  app.use('/api/authenticate', authenticationRouter);
  app.use('/api/charge', transactionRouter);

  /*Go to homepage for all routes not specified */ 
  app.get('/*', function(req, res) {
    res.redirect('/404.html')
  });

  return app;
};  
