/**
 * This component represents a list of jobs
 * that can be filtered by their status
 * (Submitted, In Progress, Completed, or All) 
 * and their corresponding checkboxes
 *
 * can be selected to change their status.
 * The selected jobs' status can be changed
 *
 * to a new status selected by the user by clicking
 * the "Set" button. The "Go" button
 *
 * will move the user to a page that corresponds to the selected status.
 */
import React, { Component } from 'react';
import '../css/ListJobs.css';
import DeleteJobButton from './DeleteJobButton';

/**
 * It renders a list of jobs, 
 * allows users to select and change the status of the jobs.
 * and allows users to delete the jobs.
 */
class ListJobs extends Component {
  constructor(props) {
    super(props);

    /**
     * The component takes the following props:
     * `url`:      The URL of the API endpoint that returns the list of jobs.
     * `targetid`: A list of job IDs that should be highlighted in the list.
     * `onFindId`: A function that is called when a user clicks on a job ID.
     * `onFinish`: A function that is called
     *             when a user changes the status of a job.
     */
    this.state = {
      // A list of jobs.
      jobs: [],  

      /**
       * A map that maps job IDs to a boolean value
       * that indicates whether the job is checked.
       */
      checkedJobsMap: new Map(), 
      changeStatus: -1
    };

    this.selectCheckBox = this.selectCheckBox.bind(this);
    this.selectStatus = this.selectStatus.bind(this);
    this.setSelectedStatus = this.setSelectedStatus.bind(this);
    this.gotoSelectedStatus = this.gotoSelectedStatus.bind(this);
  }

  componentDidMount() {
    this.fetchJobs();
  }

  // This function updates the selected job checkboxes.
  selectCheckBox(event, id) {
    event.preventDefault();

    let checkedJobsMap = this.state.checkedJobsMap ;
    checkedJobsMap.set(id, !checkedJobsMap.get(id));

    this.setState({ 
      checkedJobsMap: checkedJobsMap,
    });

  }

  fetchJobs() {
    /** 
     * Use a timeout to ensure
     * the response arrives after the component mounts.
     */
    this.fetchTimeout = setTimeout( () => {

      // Make a GET request to the server with the specified URL.
      fetch('/api/jobs/' + this.props.url)
        .then(response => {
          if (!response.ok){
            throw Error(response.statusText);
          }
          response.json().then(jobs => {
            let checkedJobsMap = new Map();
            /**
             * Set each job's ID as a key in the unchecked jobs map
             * and set the value to false.
             * When client checked the job, will reset it to true.
             */
            jobs.forEach(job => {
              checkedJobsMap.set(job._id, false);
            });
            this.setState( {
              jobs: jobs,
              checkedJobsMap: checkedJobsMap
            });
          });
        }).catch(error => {
          console.log('Fetch error:', error);
        }) 
      }, 1000);
  };

  componentWillUnmount() {
    clearTimeout(this.fetchTimeout);
  }

  // This function updates the value of the 'changeStatus' state 
  selectStatus(event) {
    event.preventDefault();
    console.log("Change Status Select.");
    console.log(event.target.value);
    this.setState({ changeStatus: event.target.value });
  }

  // method navigates to the page for the selected status.
  gotoSelectedStatus(event) {
    const gostatus = this.state.changeStatus;
    event.preventDefault();
    switch (gostatus) {
      case "0":
        this.props.onSubmitted([]);
        break;
      case "1":
        this.props.onInProgress([]);
        break;
      case "2":
        this.props.onCompleted([]);
        break;
      default:
        this.props.onFinish([]);
        break;
    }
  }

  /**
   * method sends a request to the API
   * to change the status of the selected jobs.
   */
  setSelectedStatus(event) {
    event.preventDefault();
    if (!(this.state.changeStatus < 0 )) {
      let selectJobsPool = [];
      this.state.checkedJobsMap.forEach((value, key) => {
        if ( value ) {
          selectJobsPool.push(key);
        }
      });

      fetch('/api/jobs/updatestatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ids: selectJobsPool,
          status: this.state.changeStatus
        })
      })
      .then(response => {
        if (!response.ok){
          throw Error(response.statusText);
        }
        response.json().then(jobs => {
          console.log(jobs);

          /**
           * In the archived list. in that list every job's archived is true.
           * when client update the archived jobs. 
           * finished will render archived list.
           */
          if (this.state.jobs[0].archived) {
            this.props.onArchivedFinish(selectJobsPool);
          } else {
            this.props.onFinish(selectJobsPool);
          }
        });
      }).catch(error => {
        console.log('Fetch error:', error);
      })
    }
  }
  
  render() {
    const { jobs, checkedJobsMap, changeStatus } = this.state;

    // render the list.
    return (
      <>
        <span>

        <select name="changeStatus" 
          onChange={this.selectStatus} 
          value={changeStatus}>

          <option value={-1}>All</option>
          <option value={0}>Submitted</option>
          <option value={1}>In Progress</option>
          <option value={2}>Completed</option>
        </select>

        <label>Change selected Jobs to </label>

        <button onClick={this.setSelectedStatus}>
          Set
        </button>

        <label>Go to</label>

        <button onClick={this.gotoSelectedStatus}>
          Go
        </button>

        </span>

        {jobs.map(job => (
         <div className={ this.props.targetid.indexOf(job._id) > -1 ? "targetjob" : "nontargetjob" } >
          <ul key={job._id}>
            <li>
            Job Id: 
              <button onClick={(event) => this.selectCheckBox(event, job._id)}
                className={checkedJobsMap.get(job._id) ? "selectedjob" : "unselectjob" } >
                {checkedJobsMap.get(job._id) ? "Selected" : "UnSelect" }
              </button>
              <button onClick={() => this.props.onFindId(job._id)}>
                {job._id}
              </button>

              <DeleteJobButton 
                jobid={job._id} 
                onFinish={this.props.onFinish} />  
            </li>
            <li>Description: {job.description}</li>
            <li>Location: {job.location}</li>
            <li>Priority: {job.priority}</li>
            <li>Status: {job.status}</li>
            <li>Submitted Date: {job.dateSubmitted}</li>
            <li>Archived: {job.archived ? "True" : "False"}</li>
            <hr/>
          </ul>
         </div>
        ))}

      </>
    );
  }
}

export default ListJobs;
