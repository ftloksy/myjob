/**
 * this is the test_suit for this package.
 */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app.js';

chai.use(chaiHttp);
const expect = chai.expect;

const deleteJobTest = () => {
  describe('DELETE /api/jobs', () => {
  
    it("Delete a Job for Id in db.", (done) => {
        chai.request(app)
          .delete('/api/jobs/6453cf687a6b27ce22b26170')
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

export default deleteJobTest;
