var mongoose = require('mongoose');

var caseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: null }
});

module.exports = mongoose.model('Case', caseSchema);