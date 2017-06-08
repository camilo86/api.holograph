var mongoose = require('mongoose');

var edgesSchema = new mongoose.Schema({
  source: { type: mongoose.Schema.Types.ObjectId, ref: 'Vertex', required: true },
  target: { type: mongoose.Schema.Types.ObjectId, ref: 'Vertex', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Edge', edgesSchema);