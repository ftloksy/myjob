import React, { Component } from 'react';

// This class represents a button that deletes a job.
class DeleteJobButton extends Component {
  constructor(props) {
    super(props);

    /**
     * The `props` object contains the following properties:
     * `jobid`: The ID of the job to delete.
     * `onFinish`: A function that is called when the job is deleted.
     */
    this.deleteJobById = this.deleteJobById.bind(this);
  }

  // This function deletes the job with the specified ID.
  async deleteJobById() {

    /**
     * This function makes an HTTP DELETE request to the `/api/jobs/` endpoint.
     * The request body contains the ID of the job to delete.
     */
     await fetch('/api/jobs/' + this.props.jobid, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok){
          throw Error(response.statusText);
        }
      }).then(() => {
        // The job is deleted successfully. and re-list all jobs.
        this.props.onFinish([]);
      }).catch(error => {
        console.log('Fetch error:', error);
      });

  };

  render() {

      return (
        <button onClick={this.deleteJobById}>Delete</button>
      );
  }
}

export default DeleteJobButton;
