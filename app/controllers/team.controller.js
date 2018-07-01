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
			res.json({Teams: Team});
		});
	}

	TeamObj.GetTeam = function(req, res, next){
		Team.find(function(err, Teams){
			if(err) {
				res.json({error: "Something went wrong"});
				return
			}
			res.json({Teams: Teams});
		});
	}

	return TeamObj;
}

module.exports = TeamCtrl;
