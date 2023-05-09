/**
 * this is the test_suit for this package.
 */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app.js';

chai.use(chaiHttp);
const expect = chai.expect;

const putJobTest = () => {
  describe('POST /api/jobs', () => {
  
    it("Modify a Job for Id in db.", (done) => {
        chai.request(app)
          .put('/api/jobs/64511a61c9d4be9da8394279')
          .send(
            {
              description: 'Fire the Garden',
              location: '2356 Maple St, Anytown, USA',
              priority: 'Medium',
              status: 1,
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

export default putJobTest;
