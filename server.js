'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

process.env.APP_SECRET = process.env.APP_SECRET || 'whatisthis';

var rewardRoutes = express.Router();
var userRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI ||
                'mongodb://localhost/rewards_development');

app.use(passport.initialize());
require('./lib/passport_strat')(passport);

app.use(express.static(__dirname + '/build'));

require('./routes/rewardRoutes')(rewardRoutes);
require('./routes/authRoutes')(userRoutes, passport);

app.use('/api', rewardRoutes);
app.use('/api', userRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('Server running on port ' + (process.env.PORT || 3000));
});
