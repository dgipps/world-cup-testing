"use strict";

var TeamCtrl = function(Team){

	var TeamObj = {};

	TeamObj.PostTeam = function(req, res, next){
		var newTeam = new Team(req.body);
		newTeam.save(function(err, Team){
			if(err){
				res.json({error: err.message});
				return;
			}
			res.json({teams: Team});
		});
	}

	TeamObj.GetTeam = function(req, res, next){
		Team.find().exec(function(err, Teams){
			if(err) {
				res.json({error: "Something went wrong"});
				return
			}
			res.json({teams: Teams});
		});
	}

	return TeamObj;
}

module.exports = TeamCtrl;
