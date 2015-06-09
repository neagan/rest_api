'use strict'; // this is broken

process.env.MONGOLAB_URI = 'mongodb://localhost/rewards_test';
require('../../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

var Reward = require('../../models/Reward');

describe('reward REST api', function() {
  var token;
  var rewardId;

  before(function(done) {
    chai.request('localhost:3000')
      .post('/api/create_user')
      .send({username: 'test', email: 'test@example.com', password: 'tester'})
      .end(function(err, res) {
        token = res.body.token;
        done();
      });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a new reward profile', function(done) {
    chai.request('localhost:3000')
      .post('/api/rewards')
      .send({eat: token, level: 'gold', points: 2000})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.level).to.eql('gold');
        expect(res.body.points).to.eql(2000);
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('_rewardId');
        rewardId = res.body._rewardId;
        done();
      });
  });

  it('should be able to get a specific reward profile', function(done) {
    chai.request('localhost:3000')
      .get('/api/rewards/' + rewardId)
      .send({eat: token})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should invalidate a bad input', function(done) {
    chai.request('localhost:3000')
      .post('/api/rewards')
      .send({eat: token, level: 'blue', points: 4100})
      .end(function(err, res) {
        expect(res.body.name).to.eql('ValidationError');
        done();
      });

  });

  it('should be able to update a reward profile', function(done) {
    chai.request('localhost:3000')
      .put('/api/rewards/' + rewardId)
      .send({level: 'platinum', points: 3000, eat: token})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('update successful');
        done();
      });
  });

  it('should be able to delete a reward profile', function(done) {
    chai.request('localhost:3000')
      .del('/api/rewards/' + rewardId)
      .send({eat: token})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('delete successful');
        done();
      });
  });

});
