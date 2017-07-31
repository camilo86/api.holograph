var mongoose = require('mongoose');

var caseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
});

caseSchema.methods.public = function() {
  return {
    _id: this.id,
    name: this.name,
    description: this.description
  };
};

module.exports = mongoose.model('Case', caseSchema);