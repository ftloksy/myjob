/**
 * this is the test_suit for this package.
 */
import DbHandler from '../database/DbHandler.js';
import mongoose from 'mongoose'
const dbHandler = new DbHandler();

const manyUpdate = () => {
  describe('Many Update', () => {
  
    it('Use Id to find in Mongodb.', (done) => {
      dbHandler.updateByIdsStatus(
        ["6450f2563d6cf3d6d9e35cef", "644ae00109b66ea6098be90c"], 2)
      .then((obj) => {
        console.log(obj)
        done();
      });
    });
  });
}

export default manyUpdate;

// db.jobs.find({ _id: { $in: [ ObjectId("6450f2563d6cf3d6d9e35cef"), ObjectId("644ae00109b66ea6098be90c") ]}})

