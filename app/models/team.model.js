var mongoose = require('mongoose');
var validators = require('./validators/team.validators.js');
var Schema = mongoose.Schema;

// Team schema
var TeamSchema = new Schema({
    country: {type: String, required: true, index: { unique: true }, validate: [ validators.validateQualifiedCountry, "Country did not qualify."]},
    fifa_code: {type: String, required: true, index: { unique: true }, validate: [ validators.validateFifaCode, "Fifa Code is invalid."]},
    group_id: Number,
    group_letter: String,
});

var TeamModel = mongoose.model('Team', TeamSchema);

module.exports = TeamModel;
