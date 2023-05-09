import Job from '../models/Job.js';

class JobController {
  
   /** 
    * The class constructor takes a dbHandler parameter
    * that is an instance of a database handler class
    * that is responsible for performing database operations related to jobs.
    */
  constructor(dbHandler) {
    this.db = dbHandler;
  }
  
  /**
   * The getJobs method returns a request handler function
   * that retrieves all jobs from the database
   * and returns them as a JSON response.
   */
  getJobs (props) {
    return (req, res) => {
      this.db.findAllSorted(
        props,
        { status: 1, dateSubmitted: 1 })
      .then((dbResult) => {
        let returnObj = [];
        dbResult.forEach(row => {
          // Convert the dateSubmitted to local string.
          const dateTime = new Date(row.dateSubmitted);
          const localDate = dateTime.toLocaleDateString();

          returnObj.push({
            _id:           row._id,
            description:   row.description,
            location:      row.location,
            priority:      row.priority,
            status:        row.statusName,
            dateSubmitted: localDate,
            archived:      row.archived
          });

        })
        res.json(returnObj);
      })
    }
  }
  
  /**
   * The postJob method returns a request handler function
   * that adds a new job to the database.
   * The method reads the job data from the request body and
   * passes it to the addJob method of the database handler.
   */
  postJob () {
    return (req, res) => {
      this.db.addJob(req.body)
      .then((dbResult) => {
        res.json(dbResult);
      });
    }
  }

  /** 
   * The getASingleJob method returns a request handler function
   * that retrieves a single job from the database by its ID
   * and returns it as a JSON response.
   *
   * ref: /api/jobs/:id 
   */
  getASingleJob () {
    return (req, res) => {
      this.db.findById(req.params.id)
      .then((obj) => {
        res.json(obj);
      });
    }
  }

  /** 
   * The putASingleJob method returns a request handler function 
   * that updates a single job in the database by its ID.
   * The method reads the updated job data from the request body
   * and passes it to the findByIdUpdate method of the database handler.
   * return the updated record .
   */
  putASingleJob () {
    return (req, res) => {
      this.db.findByIdUpdate(req.params.id, req.body)
      .then((obj) => {
        res.json(obj);
      });
    }
  }

  /**
   * The deleteAStringJob method returns a request handler function
   * that deletes a single job from the database by its ID.
   */
  deleteAStringJob () {
    return (req, res) => {
      const obj = this.db.deleteById(req.params.id);
      res.json({msg: "Delete record success"});
    };
  }

  /** 
   * The updateStatus method returns a request handler function
   * that updates the status of multiple jobs in the database by their IDs.
   * The method takes an object with two properties: 
   * ids is an array of job IDs, 
   * and status is the new status value ( int ) to set for the jobs.
   */
  updateStatus () {
    return (req, res) => {
      this.db.updateByIdsStatus( req.body.ids, req.body.status )
      .then(objs => {
        res.json(objs);
      });
    }
  }
}

export default JobController;
