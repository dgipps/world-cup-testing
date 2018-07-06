"use strict";

var sinon = require('sinon'),
	expect = require('chai').expect;

var MOCK_MATCHES_JSON = require('./mock-data');
var getCountryStats = require('../../realtime/world-cup-stats');
var matches = require('../../realtime/matches-api');

describe('World Cup Stats testing', function () {
    var getMatchesStub;

    before(function() {
        getMatchesStub = sinon.stub(matches, 'getMatches')
            .returns(
                new Promise(function (resolve, reject) {
                    resolve(MOCK_MATCHES_JSON);
                })
            )
    });
    after(function() {
        getMatchesStub.restore();
    });

    it('getCountryStats returns stats', function () {
        var stats = getCountryStats(MOCK_MATCHES_JSON, 'FRA')
        expect(stats.wins).to.equal(3);
        expect(stats.goals).to.equal(7);
    });
});
