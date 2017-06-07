var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').Should();
var api = require('./../api.holograph');

chai.use(chaiHttp);

describe('Vertices', () => {

  var vertex = {
    name: 'vertex 1',
    type: 'computer'
  };

  var vertexUpdated = {
    name: '1',
    type: 'account'
  };

  before((done) => {
    chai.request(api)
      .get('/v1/cases')
      .end((req, res) => {
        vertex.caseId = res.body[0]._id;
        
        done();
      });
  });

  it('should create a vertex', (done) => {
    chai.request(api)
      .post('/v1/cases/' + vertex.caseId + '/vertices')
      .send(vertex)
      .end((req, res) => {
        res.should.have.status(201);

        res.body.should.have.property('name');
        res.body.name.should.equal(vertex.name)

        res.body.should.have.property('type');
        res.body.type.should.equal(vertex.type);

        res.body.should.have.property('_id');
        vertex._id = res.body._id;

        done(); 
      });
  });

  it('should get all verticies in a case', (done) => {
    chai.request(api)
      .get('/v1/cases/' + vertex.caseId + '/vertices')
      .end((req, res) => {
        res.should.have.status(200);

        res.body.should.have.lengthOf(1);

        res.body[0].should.have.property('name');
        res.body[0].name.should.equal(vertex.name)

        res.body[0].should.have.property('type');
        res.body[0].type.should.equal(vertex.type);

        res.body[0].should.have.property('_id');
        res.body[0]._id.should.equal(vertex._id);

        done(); 
      });
  });

  it('should get a vertex in a case', (done) => {
    chai.request(api)
      .get('/v1/cases/' + vertex.caseId + '/vertices/' + vertex._id)
      .end((req, res) => {
        res.should.have.status(200);

        res.body.should.have.property('name');
        res.body.name.should.equal(vertex.name)

        res.body.should.have.property('type');
        res.body.type.should.equal(vertex.type);

        res.body.should.have.property('_id');
        res.body._id.should.equal(vertex._id);

        done(); 
      });
  });

  it('should update a vertex', (done) => {
    chai.request(api)
      .put('/v1/cases/' + vertex.caseId + '/vertices/' + vertex._id)
      .send(vertexUpdated)
      .end((req, res) => {
        res.should.have.status(204);

        done();
      });
  });
});