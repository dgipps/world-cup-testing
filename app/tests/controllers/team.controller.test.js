"use strict";

var should = require('should'),
	sinon = require('sinon'),
	mongoose = require('mongoose');

require('sinon-mongoose');

var TeamModel = require('../../models/team.model');

describe('TeamController testing', function () {
	describe('Team Post test', function () {
		it('Should call save only once', function () {
			var saveStub = sinon.stub();
			function Team(){
				this.save = saveStub
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
			sinon.assert.calledOnce(saveStub);
		});

		it('Should save team', function (done) {
			var teamMock = sinon.mock(new TeamModel({
				country:  'Iceland',
				fifa_code:   'ISL',
				group_id: 4,
				group_letter: 'D',
			}));
			var team = teamMock.object;

			teamMock
			.expects('save')
			.yields(null, 'SAVED');

			team.save(function(err, result) {
				teamMock.verify();
				teamMock.restore();
				should.equal('SAVED', result, "Test fails due to unexpected result")
				done();
			});
		});

	});

	describe('Get all Team test', function () {
		it('Should call find once', function (done) {
			var TeamMock = sinon.mock(TeamModel);
			TeamMock
			.expects('find')
			.yields(null, 'TODOS');

			TeamModel.find(function (err, result) {
				TeamMock.verify();
				TeamMock.restore();
				should.equal('TODOS', result, "Test fails due to unexpected result")
				done();
			});
		});
	});
});
