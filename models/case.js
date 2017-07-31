var mongoose = require('mongoose');

var caseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  graph: {
    vertices: [
      {
         name: { type: String }
      }
    ],
    edges: [
      {
        source: { type: mongoose.Schema.Types.ObjectId },
        target: { type: mongoose.Schema.Types.ObjectId }
      }
    ]
  }
});

caseSchema.methods.public = function() {
  return {
    _id: this.id,
    name: this.name,
    description: this.description,
    graph: this.graph
  };
};

module.exports = mongoose.model('Case', caseSchema);