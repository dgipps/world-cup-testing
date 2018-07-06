var mongoose = require('mongoose');
var validateFifaCode = require('./validators/team.validators.js').validateFifaCode;
var Schema = mongoose.Schema;

// Team schema
var TeamSchema = new Schema({
    country: {type: String, required: true, index: { unique: true }},
    fifa_code: {type: String, required: true, index: { unique: true }, validate: [ validateFifaCode, "Fifa Code is invalid."]},
    group_id: Number,
    group_letter: String,
});

var TeamModel = mongoose.model('Team', TeamSchema);

module.exports = TeamModel;
