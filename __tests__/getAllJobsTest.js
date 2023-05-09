/**
 * this is the test_suit for this package.
 */
import chai from 'chai';
import chaiHttp from 'chai-http';

import DbHandler from '../database/DbHandler.js';
import app from '../app.js';

chai.use(chaiHttp);
const expect = chai.expect;

const getAllJobsTest = () => {
  // Define a describe block for testing.
  describe('GET /api/jobs', () => {
  
    it("Get All Job", (done) => {
        chai.request(app)
          .get('/api/jobs')
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res).to.have.header(
              'content-type', 'application/json; charset=utf-8');
            done();
          });
      });
  });
};

export default getAllJobsTest;
