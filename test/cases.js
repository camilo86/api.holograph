var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').Should();
var api = require('./../api.holograph');

chai.use(chaiHttp);

describe('Cases', () => {

  var currentCase = {
    name: 'cyber case',
    description: 'new case'
  };

  it('should create a case', (done) => {
    chai.request(api)
      .post('/v1/cases')
      .send(currentCase)
      .end((req, res) => {
        res.should.have.status(201);

        res.body.should.have.property('name');
        res.body.name.should.equal(currentCase.name)

        res.body.should.have.property('description');
        res.body.description.should.equal(currentCase.description);

        res.body.should.have.property('_id');
        currentCase._id = res.body._id;

        done();
      });
  });

  it('should get all cases', (done) => {
    chai.request(api)
      .get('/v1/cases')
      .end((req, res) => {
        res.should.have.status(200);

        res.body.should.have.lengthOf(1);

        res.body[0].should.have.property('name');
        res.body[0].name.should.equal(currentCase.name)

        res.body[0].should.have.property('description');
        res.body[0].description.should.equal(currentCase.description);

        res.body[0].should.have.property('_id');
        res.body[0]._id.should.equal(currentCase._id);

        done();
      });
  });
});