var async = require('async');
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

exports.updateVertices = (vertices, next) => {


  async.each(vertices,
    (item, callback) => {
      Vertex.update({
        '_id': item._id
      },
      {
        '$set': {
          'coordinates': item.coordinates
        }
      }, (error, vertex) => {
        callback();
      });
    }, (error) => {
      next(error);
    });





  // vertices.forEach((vertex, index) => {
  //   Vertex.update({
  //     '_id': vertex._id
  //   },
  //   {
  //     '$set': {
  //       'coordinates': vertex.coordinates
  //     }
  //   }, (error, vertex) => {
  //     if(vertex._id == lastItemId) {
        
  //       next(null);
  //     }
  //   });
  // });
};