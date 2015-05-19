'use strict';

require('../server');

var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var Sql = require('sequelize');
var sql = new Sql('reward_dev_test', 'reward_dev', 'reward123', {
  dialect: 'postgres'
});

var Reward = require('../models/Reward');

describe('reward REST api', function() {

  after(function(done) {
    Reward.drop()
    .then(function() {
      done();
    })
    .error(function(err) {
      done(err);
    });
  });

  it('should be able to create a new reward profile', function(done) {
    chai.request('localhost:3000')
      .post('/api/rewards')
      .send({name: 'test', level: 'gold', points: 2000})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('test');
        expect(res.body.level).to.eql('gold');
        expect(res.body.points).to.eql(2000);
        expect(res.body).to.have.property('id');
        done();
      });
  });

  it('should be able to get an array of profiles', function(done) {
    chai.request('localhost:3000')
      .get('/api/rewards')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should be able to update a reward profile', function(done) {
    chai.request('localhost:3000')
      .put('/api/rewards/' + 1)
      .send({name: 'update', level: 'silver', points: 1000})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Update Successful');
        done();
      });
  });

  it('should be able to delete a reward profile', function(done) {
    chai.request('localhost:3000')
      .del('/api/rewards/' + 1)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Delete Successful');
        done();
      });
  });

});
