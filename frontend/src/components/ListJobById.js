import React, { Component } from 'react';
import InputJobForm from './InputJobForm';

/**
 * This class represents a component that lists a job by ID.
 * and client can use this webpage to modify the job.
 */
class ListJobById extends Component {
  constructor(props) {
    super(props);

    /**
     * The `props` object contains the following properties:
     * `jobid`: The ID of the job to list.
     * `onFinish`: A function that is called
     * when the job's attribute archived is false.
     * and list all unarchived jobs.
     * `onArchivedFinish`: A function that is called
     * when the job's attribute archived is true.
     * and list all archived jobs.
     */
    this.state = {
      inputForm: <></>
    };

    this.handleModifyJob = this.handleModifyJob.bind(this);
    this.fetchJobs = this.fetchJobs.bind(this);
  }

  componentDidMount() {
    this.fetchJobs();
  }

  // This function fetches the job with the specified ID.
  async fetchJobs() {

      /**
       * This function makes an HTTP GET request
       * to the `/api/jobs/:id` endpoint.
       * The request body contains the ID of the job to fetch.
       */
      fetch('/api/jobs/' + this.props.jobid )
        .then(response => {
          if (!response.ok){
            throw Error(response.statusText);
          }

          /**
           * The job is successfully fetched.
           * Create a InputForm component for client to modify.
           */
          response.json().then(job => {
            this.setState({
              inputForm: <InputJobForm
                description={job.description}
                location={job.location}
                priority={job.priority}
                status={job.status}
                dateSubmitted={job.dateSubmitted}
                archived={job.archived}
                submitForm={(
                  description, location,
                  priority, status,
                  dateSubmitted, archived ) => this.handleModifyJob(
                    description, location,
                    priority, status,
                    dateSubmitted, archived
                )}
              />
            });
          });
        }).catch(error => {
          console.log('Fetch error:', error);
        }) 
  };

  componentWillUnmount() {
    clearTimeout(this.inputFormTimeout);
  }

  // This function is called when the user submits the form.
  handleModifyJob(
    description,
    location,
    priority,
    status,
    dateSubmitted,
    archived
      ) {
        /**
         * Make an HTTP PUT request to the `/api/jobs/:id` endpoint.
         * The request body contains the updated job data.
         */
        fetch('/api/jobs/' + this.props.jobid, {
          method: 'PUT',
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
        }).then(() => {

          /**
           * The job is successfully updated.
           * redirect to another web layout.
           */
          if (archived) {
            this.props.onArchivedFinish(this.props.jobid);
          } else {
            this.props.onFinish([this.props.jobid]);
          }
        }).catch(error => {
          console.log('Fetch error:', error);
        }).catch(error => {
          console.log('Fetch error:', error);
        });
  };

  
  render() {
   const  inputForm  = this.state.inputForm;

    return (
      <>
        {inputForm}
      </>
    );
  }
}

export default ListJobById;
