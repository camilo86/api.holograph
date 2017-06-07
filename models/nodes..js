var mongoose = require('mongoose');

var nodeSchema = new mongoose.Schema({
  name: { type: String, maxlength: 150, required: true },
  type: { type: String, maxlength: 150, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Node', nodeSchema);