'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

process.env.APP_SECRET = process.env.APP_SECRET || 'whatisthis';

mongoose.connect(process.env.MONGOLAB_URI ||
                'mongodb://localhost/rewards_development');

var rewardRoutes = express.Router();
var userRoutes = express.Router();

require('./routes/rewardRoutes')(rewardRoutes);
require('./routes/userRoutes')(userRoutes, passport);

app.use('/api', rewardRoutes);
app.use('/api', userRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('Server running on port ' + (process.env.PORT || 3000));
});
