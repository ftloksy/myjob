/**
 * this is the test_suit for this package.
 */
import DbHandler from '../database/DbHandler.js';
const dbHandler = new DbHandler();


const findByIdTest = () => {
  describe('Testing findById', () => {
  
    it('Use Id to find in Mongodb.', (done) => {
      dbHandler.findById('644ae00109b66ea6098be907')
      .then((obj) => {
        console.log(obj)
        done();
      });
    });
  });
}

export default findByIdTest;
