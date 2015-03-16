'use strict';
var mongoose = require('mongoose');
var express = require('express');
var unicornRoutes = require('./routes/unicorn_routes');

mongoose.connect(process.env.MONG_URI || 'mongodb://localhost/unicorn_corral_no_auth');

var app = express();
app.use(express.static(__dirname + '/build'));

var unicornRouter = express.Router();

unicornRoutes(unicornRouter, app.get('appSecret'));

app.use('/api', unicornRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server listening');
});
