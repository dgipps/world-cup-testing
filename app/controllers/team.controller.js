"use strict";

const matches = require('../realtime/matches-api');
const getCountryStats = require('../realtime/world-cup-stats');
const _ = require('lodash');

var TeamCtrl = function(Team){

	var TeamObj = {};

	TeamObj.PostTeam = function(req, res, next){
		var newTeam = new Team(req.body);
		newTeam.save(function(err, Team){
			if(err){
				res.status(400)
				res.json({error: err.message});
				return;
			}
			res.status(201)
			res.json({teams: Team});
		});
	}

	TeamObj.GetTeam = function(req, res, next){
		Team.find().exec(function(err, returnedTeams) {
		    if(err) {
				res.status(400)
                return
            }
            matches.getMatches()
                .then(function(data) {
                    var teamsWithStats = _.map(returnedTeams, function(team) {
                        var teamJSON = team.toJSON();
                        teamJSON.stats = getCountryStats(data, team.fifa_code);
                        return teamJSON;
                    });
			        res.json({teams: teamsWithStats});
                });
		});
	}

	TeamObj.DeleteTeam = function(req, res, next){
		Team.remove({fifa_code: req.body.fifa_code }, function(err, teams){
			if(err) {
				res.status(400)
				return
			}
			res.json();
		});
	}

	return TeamObj;
}

module.exports = TeamCtrl;
