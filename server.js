'use strict';

var mongoose = require('mongoose');
var express = require('express');
var app = express();

var router = express.Router();

// Fix localhost
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/')

require('./routes')(router);

app.use('/api', router);

app.listen(3000, function() {
  console.log('Server running on port ' (process.env.PORT || 3000));
});
