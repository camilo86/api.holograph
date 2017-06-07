var mongoose = require('mongoose');

var edgesSchema = new mongoose.Schema({
  source: { type: mongoose.Schema.Types.ObjectId, ref: 'Node', required: true },
  target: { type: mongoose.Schema.Types.ObjectId, ref: 'Node', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Edge', edgesSchema);