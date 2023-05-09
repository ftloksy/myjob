import React, { Component } from 'react';
import InputJobForm from './InputJobForm';

// This class represents a component that adds a job.
class AddJobs extends Component {

  constructor(props) {
    super(props);

    /**
     * The `state` object contains the following properties:
     * `description`: The description of the job.
     * `location`: The location of the job.
     * `priority`: The priority of the job.
     * `status`: The status of the job.
     * `dateSubmitted`: The date the job was submitted.
     * `archived`: Whether the job is archived.
     */
    this.state = {
      description: "",
      location: "",
      priority: "",
      status: 0,
      dateSubmitted: new Date(),
      archived: false
    };

    this.handleCreateJob = this.handleCreateJob.bind(this);
  }


  /**
   * This function is called when the user submits the form.
   * It creates a new job and adds it to the database.
   */
  handleCreateJob(
	  description, 
	  location,
	  priority,
	  status,
	  dateSubmitted,
	  archived
  		) {
      
      /**
       * Make an HTTP POST request to the `/api/jobs` endpoint.
       * The request body contains the job data.
       */
      fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          description,
          location,
          priority,
          status,
          dateSubmitted,
          archived
        })
      }).then(response => {
        if (!response.ok){
          throw Error(response.statusText);
        };
        response.json().then(job => {
          if (!archived) {
            this.props.onFinish([job._id]);
          } else {
            this.props.onArchivedFinish([job._id]);
          }
        });
      }).catch(error => {
        console.log('Fetch error:', error);
      })
  };

  
  render() {
    const { description, location,
      priority, status, dateSubmitted, archived } = this.state;

    // Create a Input form for user input job contents.
    return (
	   <InputJobForm 
	    description={description}
	    location={location}
 	    priority={priority} 
	    status={status} 
	    dateSubmitted={dateSubmitted}
	    archived={archived} 
	    submitForm={( 
	     description, location,
 	     priority, status, 
	     dateSubmitted, archived ) => this.handleCreateJob(
	       description, location,
 	       priority, status, 
	       dateSubmitted, archived 
	     )}
	   />
    );
  }
}

export default AddJobs;
