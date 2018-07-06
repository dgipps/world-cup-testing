const matches = require('./matches-api');
const _ = require('lodash');

var getNumberOfWins = function(data, fifa_code) {
    return _.reduce(data, function(wins, match) {
        var win = (match.winner_code === fifa_code) ? 1 : 0;
        return wins + win;
    }, 0)
}

var getNumberOfGoals = function(data, fifa_code) {
    return _.reduce(data, function(goals, match) {
        var new_goals = (match.home_team.code === fifa_code) ? match.home_team.goals : 0;
        new_goals = (match.away_team.code === fifa_code) ? match.away_team.goals : new_goals;
        return goals + new_goals;
    }, 0)
}
var getCountryStats = function(fifa_code) {
    return new Promise(function(resolve, reject) {
        matches.getMatches()
            .then(function(data) {
                resolve({
                    wins: getNumberOfWins(data, fifa_code),
                    goals: getNumberOfGoals(data, fifa_code)
                });
            });
    });
};

module.exports = getCountryStats
