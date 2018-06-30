var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Team schema
var TeamSchema = new Schema({
    country:  String,
    fifa_code:   String,
    group_id: Number,
    group_letter: String,
});

// True since it is a parallel middleware
TeamSchema.pre('save', function(next, done) {
	if(!this.country){
		next(new Error("Country should not be null"));
	}
	if(!this.fifa_code){
		next(new Error("FIFA Code should not be null"));
	}
  	next();
});

var TeamModel = mongoose.model('Team', TeamSchema);

module.exports = TeamModel;
