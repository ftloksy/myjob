/**
 * this is the test_suit for this package.
 */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app.js';

chai.use(chaiHttp);
const expect = chai.expect;

const updateStatusTest = () => {
  describe('POST /api/jobs/updatestatus', () => {
  
    it("Modify a Jobs status follow id in db.", (done) => {
        chai.request(app)
          .post('/api/jobs/updatestatus')
          .send(
            {
              ids: ['64552160b793e17f4785c25e', '64551f64d7f893f91b26d9b8'],
              status: 3,
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

export default updateStatusTest;
