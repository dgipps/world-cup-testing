"use strict";

var should = require('should'),
	sinon = require('sinon'),
	mongoose = require('mongoose'),
	expect = require('chai').expect;

require('sinon-mongoose');

var TeamModel = require('../../models/team.model');
var matches = require('../../realtime/matches-api');

describe('TeamController testing', function () {
	var sandbox;
	beforeEach(function () {
		sandbox = sinon.sandbox.create();
	});

	afterEach(function () {
		sandbox.restore();
	});

	describe('Team Post test', function () {
		it('Should call save only once', function () {
			var saveSpy = sandbox.spy();
			function Team(){
				this.save = saveSpy
			}
			var req = {
				body: {
					country:  'Iceland',
					fifa_code:   'ISL',
					group_id: 4,
					group_letter: 'D',
				}
			}
			var res = {}, next = {};
			var TeamController = require('../../controllers/team.controller')(Team);
			TeamController.PostTeam(req, res, next);
			sinon.assert.calledOnce(saveSpy);
		});
	});

	describe('Get all Team test', function () {
		it('Should call find once', function (done) {
		    sandbox.stub(matches, 'getMatches')
                .returns(new Promise(function(resolve, reject) {
                    resolve([])
                }))

			var teamMock = sandbox.mock(TeamModel)
				.expects('find')
				.chain('exec')
				.yields(null, []);

			var req = {}, next = {};
			var responseJSON = function(payload) {
			    teamMock.verify();
			    expect(payload).to.deep.equal({teams: []});
			    done()
            }
			var res = { json: responseJSON };

			var TeamController = require('../../controllers/team.controller')(TeamModel);
			TeamController.GetTeam(req, res, next);
		});
	});
});
