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
        res.body.source._id.should.equal(edge.source);

        res.body.should.have.property('target');
        res.body.target._id.should.equal(edge.target);

        res.body.should.have.property('_id');
        edge._id = res.body._id;

        done(); 
      });
  });

  it('should get all edges in a case', (done) => {
    chai.request(api)
      .get('/v1/cases/' + edge.caseId + '/edges')
      .end((req, res) => {
        res.should.have.status(200);

        res.body.should.have.lengthOf(1);

        res.body[0].should.have.property('source');
        res.body[0].source._id.should.equal(edge.source);

        res.body[0].should.have.property('target');
        res.body[0].target._id.should.equal(edge.target);

        res.body[0].should.have.property('_id');
        res.body[0]._id.should.equal(edge._id);

        done(); 
      });
  });

  it('should get an edge in a case', (done) => {
    chai.request(api)
      .get('/v1/cases/' + edge.caseId + '/edges/' + edge._id)
      .end((req, res) => {
        res.should.have.status(200);

        res.body.should.have.property('source');
        res.body.source._id.should.equal(edge.source);

        res.body.should.have.property('target');
        res.body.target._id.should.equal(edge.target);

        res.body.should.have.property('_id');
        res.body._id.should.equal(edge._id);

        done(); 
      });
  });
});