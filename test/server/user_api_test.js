'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/auth_test';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

var User = require('../models/User');

describe('user creation and authentication', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a new user', function(done) {
    chai.request('localhost:3000')
      .post('/api/create_user')
      .send({username: 'test', email: 'test@example.com', password: 'tester'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.token).to.exist; // jshint ignore:line
        done();
      });
  });

  it('should be able to sign in', function(done) {
    chai.request('localhost:3000')
      .get('/api/sign_in')
      .auth('test@example.com', 'tester')
      .end(function(err, res) {
        expect(res.body.token).to.exist; // jshint ignore:line
        done();
      });
  });

});
