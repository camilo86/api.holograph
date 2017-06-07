var mongoose = require('mongoose');

var vertexSchema = new mongoose.Schema({
  name: { type: String, maxlength: 150, required: true },
  type: { type: String, maxlength: 150, required: true },
  case: { type: mongoose.Schema.Types.ObjectId, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Vertex', vertexSchema);