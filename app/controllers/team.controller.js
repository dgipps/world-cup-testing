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
			res.status(201)
			res.json({teams: Team});
		});
	}

	TeamObj.GetTeam = function(req, res, next){
		Team.find().exec(function(err, Teams){
			if(err) {
				res.status(400)
                return
            }
			res.json({teams: Teams});
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
