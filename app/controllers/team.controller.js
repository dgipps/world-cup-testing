"use strict";

var TeamCtrl = function(Team){

	var TeamObj = {};

	TeamObj.PostTeam = function(req, res, next){
		var newTeam = new Team(req.body);
		newTeam.save(function(err, Team){
			if(err){
				res.json({status: false, error: err.message});
				return;
			}
			res.json({status: true, Team: Team});
		});
	}

	TeamObj.GetTeam = function(req, res, next){
		Team.find(function(err, Teams){
			if(err) {
				res.json({status: false, error: "Something went wrong"});
				return
			}
			res.json({status: true, Team: Teams});
		});
	}

	return TeamObj;
}

module.exports = TeamCtrl;
