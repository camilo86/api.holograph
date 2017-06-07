var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').Should();
var api = require('./../api.holograph');

chai.use(chaiHttp);

describe('Cases', () => {

  var node = {
    name: 'node 1',
    type: 'computer'
  };

  before((done) => {
    chai.request(api)
      .get('/v1/cases')
      .end((req, res) => {
        node.caseId = res.body.caseId
      });
  });

  it('should create a node', (done) => {
    chai.request(api)
      .post('/v1/cases/' + node.caseId)
      .send(node)
      .end((req, res) => {
        res.should.have.status(201);

        res.body.should.have.property('name');
        res.body.name.should.equal(node.name)

        res.body.should.have.property('type');
        res.body.type.should.equal(node.type);

        res.body.should.have.property('_id');
        node._id = res.body._id;

        done();
      });
  });
});