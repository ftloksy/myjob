/**
 * this is the test_suit for this package.
 */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app.js';

chai.use(chaiHttp);
const expect = chai.expect;

const addJobTest = () => {
  describe('POST /api/jobs', () => {
  
    it("Add a Job in db.", (done) => {
        chai.request(app)
          .post('/api/jobs')
          .send(
            {
              description: 'Clean the gutters',
              location: '567 Maple St, Anytown, USA',
              priority: 'Medium',
              status: 0,
              dateSubmitted: new Date()
            }
           )
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res).to.have.header(
              'content-type', 'application/json; charset=utf-8');
            console.log(res.body);
            done();
          });
      });
  });
};

export default addJobTest;
