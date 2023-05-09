import mongoose from 'mongoose';

// Import the Job model, which is a model for representing jobs in MongoDB.
import Job from '../models/Job.js';

// Create a class called DbHandler.
class DbHandler {

  constructor() {

    // The MongoDB URL for the database.
    this.mongodbUrl = 'mongodb://localhost/myjob';
    this.connectDb().catch(err => console.log(err));
  }

  // Connect to the database.
  async connectDb() {
    await mongoose.connect(this.mongodbUrl);
  }

  // Close the database connection.
  async closeDbConnection() {
    await mongoose.connection.close();
  }
  
  // Add a job to the database.
  async addJob(job) {
    const recordJob = new Job(job);
    const obj = await recordJob.save();
    return obj;
  }

  // Update a job in the database by ID.
  async findByIdUpdate(id, job) {
    const obj = await Job.findByIdAndUpdate(id, job, { new: true });
    return obj;
  }

  // Find all jobs in the database that match the search criteria.
  async findAllSorted(searchObj, sortOrder) {
    const foundObjs = await Job.find(searchObj).sort(sortOrder);
    return foundObjs;
  }

  // Find one job in the database that matches the search criteria.
  async findOne(searchObj) {
    const foundObj = await Job.findOne(searchObj);
    return foundObj;
  }

  // Find a job in the database by ID.
  async findById(id) {
    const foundObj = await Job.findById(id);
    return foundObj;
  }

  // Delete a job from the database by ID.
  async deleteById(id) {
    await Job.deleteOne({ _id: id });
  }

  /**
   * Update the status of multiple jobs by ID.
   *
   * param:  jobIds    -- it is a array. record the ids ( string ).
   * param:  status    -- it change all jobIds's status to that.
   */
  async updateByIdsStatus(jobIds, status) {
    let jobsPool = [];
    jobIds.forEach(jobId => jobsPool.push(
      new mongoose.Types.ObjectId(jobId)
    ));
    // Update the status of the jobs.
    const updateObjs = await Job.updateMany(
      { _id: { $in: jobsPool } }, { $set: { status: status } });
    return updateObjs;
  }
  
}

export default DbHandler;

