var Team = require('../models/team.model');
var TeamController = require('../controllers/team.controller')(Team);

module.exports = function(app){
	app.get('/api/team', TeamController.GetTeam);
	app.post('/api/team', TeamController.PostTeam);
}
