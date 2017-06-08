var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').Should();
var api = require('./../api.holograph');

chai.use(chaiHttp);

describe('Edges', () => {

  var edge = {};

  before((done) => {
    chai.request(api)
      .get('/v1/cases')
      .end((req, res) => {
        edge.caseId = res.body[0]._id;
        
        chai.request(api)
          .get('/v1/cases/' + edge.caseId + '/vertices')
          .end((req, res) => {
            edge.source = res.body[0]._id;
            edge.target = res.body[1]._id;

            done();
          });
      });
  });

  it('should create an edge', (done) => {
    chai.request(api)
      .post('/v1/cases/' + edge.caseId + '/edges')
      .send(edge)
      .end((req, res) => {
        res.should.have.status(201);

        res.body.should.have.property('source');
        res.body.source.should.equal(edge.source);

        res.body.should.have.property('target');
        res.body.target.should.equal(edge.target);

        res.body.should.have.property('_id');
        edge._id = res.body._id;

        done(); 
      });
  });
});