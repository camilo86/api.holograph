var mongoose = require('mongoose');

var caseSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String },

  Nodes: [
    {
        Name: { type: String },
        Type: { type: String },
        Data: { type: Object }
    }
  ],
  Edges: [
    {
      Source: { type: mongoose.Schema.Types.ObjectId },
      Target: { type: mongoose.Schema.Types.ObjectId }
    }
  ]

});

caseSchema.methods.public = function() {
  return {
    _id: this.id,
    Name: this.Name,
    Description: this.Description,
    Nodes: this.Nodes,
    Edges: this.Edges
  };
};

module.exports = mongoose.model('Case', caseSchema);