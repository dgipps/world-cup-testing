"use strict";

var should = require('should'),
	sinon = require('sinon'),
	mongoose = require('mongoose'),
	expect = require('chai').expect;

require('sinon-mongoose');

var TeamModel = require('../../models/team.model');

describe('Team Model test', function() {
    describe('Team Validation test', function() {
		it('Should require a country', function () {
			const team = new TeamModel({
				fifa_code: 'ISL',
				group_id: 4,
				group_letter: 'D',
			});
			var error = team.validateSync();
			expect(error['errors']['country']).to.exist;
        });

		it('Should accept just country and fifa_code', function () {
			const team = new TeamModel({
                country: 'Iceland',
				fifa_code: 'ISL',
				group_id: 4,
				group_letter: 'D',
			});
			var error = team.validateSync();
			expect(error).to.be.undefined;
        });

		it('Should require a three character fifa_code', function () {
			const team = new TeamModel({
                country: 'Iceland',
				fifa_code: 'ISLND',
				group_id: 4,
				group_letter: 'D',
			});
			var error = team.validateSync();
			expect(error['errors']['fifa_code']).to.exist;
        });
	});
});
