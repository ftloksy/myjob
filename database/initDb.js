import DbHandler from './DbHandler.js';

const dbHandler = new DbHandler();

const addJob = async () => {

  // Create an array of users.
  const jobs = [
    {
      description: 'Fix leaky faucet in the kitchen sink',
      location: '123 Main St, Anytown, USA',
      priority: 'High',
      status: 0,
      dateSubmitted: new Date()
    },
    {
      description: 'Replace broken lightbulb in the hallway',
      location: '456 Elm St, Anytown, USA',
      priority: 'Medium',
      status: 1,
      dateSubmitted: new Date()
    },
    {
      description: 'Paint the front porch',
      location: '789 Oak St, Anytown, USA',
      priority: 'Low',
      status: 2,
      dateSubmitted: new Date(),
      dateCompleted: new Date()
    },
    {
      description: 'Mow the lawn',
      location: '234 Cherry St, Anytown, USA',
      priority: 'High',
      status: 0,
      dateSubmitted: new Date()
    }
  ];

  // Iterate over the array of jobs and add each job to the database.
  for (let i = 0; i < jobs.length; i++) {
    await dbHandler.addJob(jobs[i]);
  }
};

// Close the database connection.
dbHandler.closeDbConnection();
