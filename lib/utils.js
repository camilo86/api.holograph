var redisClient = require('./redisConnector');
var redisChannels = require('./redisChannels');
var Vertex = require('./../models/vertices');
var Case = require('./../models/cases');

/**
 * Sends a copy of the graph to the generator
 * to build the (x,y,z) of each vertices. Will
 * notify api.holograph through a redish channel
 * when done
 */
exports.sendCaseGraphToGenerator = (req, res, next) => {
  redisClient.pub.publish(redisChannels.graphGenerationNeeded,
    JSON.stringify({
      _id: req.case.id,
      graph: req.case.graph
    }));

    return res.json(req.response);
};

exports.updateVertices = (vertices) => {
  vertices.forEach((vertex) => {
    Vertex.update({
      '_id': vertex._id
    },
    {
      '$set': {
        'coordinates': vertex.coordinates
      }
    }, (error, vertex) => {
      if(error || !vertex) {
        console.log('VERTEX NOT FOUND');
      }
    });
  });
};