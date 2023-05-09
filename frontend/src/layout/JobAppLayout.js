import React, { Component } from 'react';
import ListJobs from '../components/ListJobs';
import AddJobs from '../components/AddJobs';
import ListJobById from '../components/ListJobById';

// This class represents the layout of the job application.
class JobAppLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // The `layout` property stores the HTML for the component's layout.
      layout: <></>
    };
    this.addJob = this.addJob.bind(this);
    this.listJobs = this.listJobs.bind(this);
    this.listJobById = this.listJobById.bind(this);
    this.linkhandler = this.linkhandler.bind(this);
  }

  componentDidMount() {
    /**
     * This function lists all of the jobs.
     *
     * param:   first is a array, it has many ids,
     *          when the component render will change the text to white.
     *          ( High line ).
     *          second is mark the archived.
     *          when it is false, it will list records, 
     *          it's archived attribute is false.
     *          third is a ( int ),
     *            -1: list all status records.
     *             0: list all submitted status records.
     *             1: list all In Progress status records.
     *             2: list all completed status records.
     */
    this.listJobs([], false, -1);
  }

  /**
   * The addJob method is used to create a new job web layout. 
   * It sets the layout to null to clear the current layout
   * and then sets it to a new layout consisting of an "AddJobs" component.
   */
  async addJob() {
    await this.setState({
      layout: null },
      async () => { await this.setState({
        layout: <>
                  <h3>
                    <button onClick={() => this.listJobs([], false, -1)}>
                      List All Jobs
                    </button>
                  </h3>
                  <AddJobs 
                    onFinish={(id) => this.listJobs(id, false, -1)}
                    onArchivedFinish={(id) => this.listJobs(id, true, -1)}
                    />
                    
                </>
      });
    });
  }

  /**
   * The linkhandler method is a helper function
   * that returns the URL to fetch the jobs based
   * on the archived status and job status.
   */
  linkhandler(archived, status) {
    switch (status) {
      case 0:
        return "submitted";
      case 1:
        return "inprogress";
      case 2:
        return "completed";
      default:
        if ( archived ) {
          return "archived";
        } else {
          return "";
        }
    }
  }

  /**
   * The listJobs method lists the jobs based on the given parameters. 
   *
   * When the user clicks on the buttons 
   * or finishes any operation with the job list,
   * the listJobs method is called with appropriate parameters
   * to update the job list.
   */
  async listJobs(id, archived, status) {  
    await this.setState({
      layout: null },
      async () => { await this.setState({
        layout: <>
                  <h3>
                    <button onClick={this.addJob}>
                      Create a new Job
                    </button>
                    <button onClick={ 
                      () => archived ? this.listJobs([], false, -1) : this.listJobs([], true, -1)
                      } >
                      List { archived ? "unarchived" : "archived" } jobs
                    </button>

                  </h3>
                  <ListJobs url={ this.linkhandler(archived, status) }

                    onFindId={(id) => this.listJobById(id)}
                    onFinish={(id) => this.listJobs(id, false, -1)} 
                    onArchivedFinish={(id) => this.listJobs(id, true, -1)}
                    onSubmitted={(id) => this.listJobs(id, false, 0)}
                    onInProgress={(id) => this.listJobs(id, false, 1)}
                    onCompleted={(id) => this.listJobs(id, false, 2)}
                    targetid={id} />
                </>
      });
    });
  }

  /**
   * The listJobById method is used to display details of a single job. 
   * Add client can modify the single job's contents.
   */
  async listJobById(id) {
    await this.setState({
      layout: null },
      async () => { await this.setState({
        layout: <>
                  <h3>
                    <button onClick={() => this.listJobs([], false, -1)}>
                      List All Jobs
                    </button>
                  </h3>
                  <ListJobById jobid={id} 
                    onFinish={(id) => this.listJobs(id, false, -1)} 
                    onArchivedFinish={(id) => this.listJobs(id, true, -1)} />
                </>
      });
    });
  }

  render() {

    return (
      <>
        {this.state.layout}
      </>
    );
  }
}

export default JobAppLayout;
