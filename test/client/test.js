'use strict';

var expect = require('chai').expect;
var reward = require('../../app/js/reward');

describe('reward module', function() {
  it('should return a description', function() {
    expect(reward()).to.eql('Welcome! This site can be used to view and manage your reward profile.');
  });
});
