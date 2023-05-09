import mongoose from 'mongoose';

// Create an array of strings to represent the different job statuses
const statusConverter = ["submitted", "in progress", "completed"];

const jobSchema = new mongoose.Schema({

  // The description of the job
  description: { type: String, required: true },

  // The location of the job
  location: { type: String, required: true },

  // The priority of the job
  priority: { type: String, required: true },
  
  // The status of the job
  status: { type: Number, enum: [0, 1, 2], required: true },

  // The date the job was submitted
  dateSubmitted: { type: Date, default: Date.now },

  // Whether or not the job is archived
  archived: { type: Boolean, default: false },
});

// Create a virtual field for the job status name
jobSchema.virtual('statusName').get(function() {

    // Return the corresponding status name from the statusConverter array
    return statusConverter[this.status];
  }
)

const Job = mongoose.model('Job', jobSchema);

export default Job;

