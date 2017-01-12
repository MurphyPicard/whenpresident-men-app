var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var CandidateSchema = new Schema({
  name: String,
  year: Number
});

var CandidateModel = mongoose.model('Candidate', CandidateSchema);

module.exports = CandidateModel;
