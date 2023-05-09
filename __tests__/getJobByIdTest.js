/**
 * this is the test_suit for this package.
 */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app.js';

chai.use(chaiHttp);
const expect = chai.expect;

const getJobByIdTest = () => {
  // Define a describe block for testing.
  describe('GET /api/jobs/644ae00109b66ea6098be907', () => {
  
    it("Get Job By Id", (done) => {
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

export default getJobByIdTest;
