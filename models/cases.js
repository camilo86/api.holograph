var mongoose = require('mongoose');
var redisClient = require('./../lib/redisConnector');
var redisChannels = require('./../lib/redisChannels');

var caseSchema = new mongoose.Schema({
  name: { type: String, maxlength: 150, required: true },
  description: { type: String, maxlength: 200 },
  graph: {
    vertices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vertex' }],
    edges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Edge'}]
  }
}, { timestamps: true });

caseSchema.pre('save', function (next) {
  if(!this.isModified('graph')) { return next() };
  if(this.graph.vertices.length > 0 || this.graph.edges.length > 0) {
    redisClient.pub.publish(redisChannels.graphGenerationNeeded,
    JSON.stringify({
      case: this.id
    }));
  }

  next();
});

module.exports = mongoose.model('Case', caseSchema);