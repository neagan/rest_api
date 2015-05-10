'use strict';

process.env.MONGOLAB_URL = 'mongodb://localhost/rewards_test';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

var Reward = require('../models/Reward');

describe('reward REST api', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
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
        expect(res.body).to.have.property('_id');
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

  describe('needs existing note', function() {
    beforeEach(function(done) {
      var newTest = new Reward({name: 'update', level: 'silver', points: 1000});
      newTest.save(function(err, data) {
        if (err) {
          throw err;
        }

        this.newTest = data;
        done();
      }.bind(this));
    });

    it('should be able to update a reward profile', function(done) {
      chai.request('localhost:3000')
        .put('/api/rewards/' + this.newTest._id)
        .send({name: 'update', level: 'silver', points: 1000})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Update Successful');
          done();
        });
    });

    it('should be able to delete a reward profile', function(done) {
      chai.request('localhost:3000')
        .del('/api/rewards/' + this.newTest._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Delete Successful');
          done();
        })
    })
  });

});
