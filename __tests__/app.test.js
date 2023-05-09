/**
 * this is the test_suit for this package.
 */
import DbHandler from '../database/DbHandler.js';

import getAllJobsTest from './getAllJobsTest.js';
import addJobTest from './addJobTest.js';
import findByIdTest from './findByIdTest.js';
import getJobByIdTest from './getJobByIdTest.js';
import putJobTest from './putJobTest.js';
//import deleteJobTest from './deleteJobTest.js';
import updateStatusTest from './updateStatusTest.js';
import manyUpdate from './manyUpdate.js';

const dbHandler = new DbHandler();

getAllJobsTest();
addJobTest();
findByIdTest();
getJobByIdTest();
putJobTest();
//deleteJobTest();
updateStatusTest();
manyUpdate();

after(() => {
  dbHandler.closeDbConnection();
});
