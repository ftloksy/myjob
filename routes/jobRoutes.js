import express from 'express';

// Import the Job model, which is a model for representing jobs in MongoDB.
import Job from '../models/Job.js';

/**
 * Import the DbHandler class, 
 * which is a class for handling database connections.
 */
import DbHandler from '../database/DbHandler.js';

/**
 * Import the JobController class, 
 * which is a class for handling job CRUD requests.
 */
import JobController from '../controllers/JobControler.js';

// Create a new express router.
const router = express.Router();
const dbHandler = new DbHandler();

// Define routes
const jobController = new JobController(dbHandler);

router.get('/', jobController.getJobs({ archived: false } ));

router.get('/archived', jobController.getJobs( 
    { archived: true } 
));

router.get('/submitted', jobController.getJobs( 
    { archived: false, status: 0 } 
)); 

router.get('/inprogress', jobController.getJobs( 
    { archived: false, status: 1 }
)); 

router.get('/completed', jobController.getJobs(
    { archived: false, status: 2 }
)); 

router.post('/', jobController.postJob());
router.get('/:id', jobController.getASingleJob());
router.put('/:id', jobController.putASingleJob());
router.delete('/:id', jobController.deleteAStringJob());
router.post('/updatestatus', jobController.updateStatus());

export default router;

