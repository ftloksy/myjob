import React, { Component } from 'react';
import '../css/InputJobForm.css';

/**
 * This is a React component that is used to display
 * a form for inputting job information.
 * It contains input fields for the job
 * description, location, priority, and date submitted.
 */
class InputJobForm extends Component {
  constructor(props) {
    super(props);

    const { description, location, 
      priority, dateSubmitted, status, archived } = this.props;

    this.state = {
      description: description, 
      location: location,
      priority: priority,
      dateSubmitted: dateSubmitted,
      status: status,
      archived: archived,
      
      // These variables are used to track the state of the check buttons.
      substatusChecked: false,
      inprostatusChecked: false,
      comstatusChecked: false,
      
      // These variables are used to track the state of the check buttons.
      arcChecked: false,
      unaChecked: false,

    };

    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * The componentDidMount method updates
   * the state based on the props,
   * sets default values for some state variables,
   * and converts the date to a proper format.
   */
  componentDidMount() {
    
    const {status, archived, dateSubmitted} = this.props;
    
    if (archived) {
      this.setState({
        arcChecked: true,
        unaChecked: false
      })
    } else {
      this.setState({
        arcChecked: false,
        unaChecked: true
      })
    };

    switch (status) {
      case 0:
        this.setState({
          substatusChecked: true,
          inprostatusChecked: false,
          comstatusChecked: false
        })
        break;
      case 1:
        this.setState({
          substatusChecked: false,
          inprostatusChecked: true,
          comstatusChecked: false
        })
        break;
      case 2:
        this.setState({
          substatusChecked: false,
          inprostatusChecked: true,
          comstatusChecked: false
        })
        break;
      default:
        this.setState({
          substatusChecked: false,
          inprostatusChecked: false,
          comstatusChecked: false
        })
     }
    
     /**
      * Get the date the job was submitted
      * and convert it to a local date string.
      */
     const date = new Date(dateSubmitted);
     const submittedDate = date.toLocaleDateString();

     let dateArray = submittedDate.split("/");
     let dateString = "";
    
     if (dateArray.length === 3) {
       for (let i = 0 ; i <= 1 ; i ++ ) {
         if (dateArray[i].length === 1) {
           dateArray[i] = "0" + dateArray[i];
         }
       }
     }

     dateString = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];

     console.log("Date String: ");
     console.log(dateString);

     this.setState({ 
       dateSubmitted: dateString
    });
  }

  /**
   * The handleInputChange method is called when an input element changes.
   * It sets the state based on the input element that was changed.
   *
   * and need convert three status button and two archived button's value.
   * to status and archived value.
   */
  async handleInputChange(event) {
    event.preventDefault();
    const { name, id, value } = event.target;

    console.log("I am in event handler");
    console.log("Id: " + id);

    if ( id === "substatus" ) {
      await this.setState({
        substatusChecked: true,
        inprostatusChecked: false,
        comstatusChecked: false,
        status: 0
      });

    } else if ( id === "inprostatus" ) {
      await this.setState({
        substatusChecked: false,
        inprostatusChecked: true,
        comstatusChecked: false,
        status: 1
      });

    } else if ( id === "comstatus" ) {
      await this.setState({
        substatusChecked: false,
        inprostatusChecked: false,
        comstatusChecked: true,
        status: 2
      });

    } else if ( id === 'arc' ) {
      await this.setState({
        arcChecked: true,
        unaChecked: false,
        archived: 1
      });

    } else if ( id === 'una' ) {
      await this.setState({
        arcChecked: false,
        unaChecked: true,
        archived: 0
      });

    } else {
      await this.setState( { [name]: value } );
    }
        
  }

  /**
   * The handleInputSubmit method is called when the form is submitted.
   * It retrieves the job information from the state
   * and calls a submitForm function passed in through props.
   *
   * When Client add Job record or modifty record.
   * This will call this component. so need to pass status value to
   * parent.
   */
  handleInputSubmit(event) {
    event.preventDefault();
    const { description, location, 
      priority, status, dateSubmitted, archived } = this.state;
    this.props.submitForm(
      description, location, 
      priority, status, dateSubmitted, archived
    );
  };

  render() {

    const { description, location, 
        priority, dateSubmitted, 
        substatusChecked,
        inprostatusChecked,
        comstatusChecked,
        arcChecked,
        unaChecked
      } = this.state;

      // Create User input record form.
      return (
        <form onSubmit={this.handleInputSubmit}>
          <label>
            Description
            <input
              type="text" id="des" name="description" value={description}
              onChange={this.handleInputChange}
              /><br/>
          </label>
          
          <label>
            Location
            <input
              type="text" id="loc" name="location" value={location}
              onChange={this.handleInputChange}
              /><br/>
          </label>
          
          <label>
            Priority
            <input
              type="text" id="pri" name="priority" value={priority}
              onChange={this.handleInputChange}
              /><br/>
          </label>
          
          <label>
            Date Submitted
            <input
              type="date" id="dat" name="dateSubmitted" value={dateSubmitted}
              onChange={this.handleInputChange}
              /><br/>
          </label>
          
          <h3>Job status</h3> 
            <input
              type="button" id="substatus" name="status" value="Submitted"
              onClick={this.handleInputChange}
              className={ substatusChecked ? "Checked" : "unChecked" }
              />
            <input
              type="button" id="inprostatus" name="status" value="In Progress"
              onClick={this.handleInputChange}
              className={ inprostatusChecked ? "Checked" : "unChecked" }
              />
            <input
              type="button" id="comstatus" name="status" value="Completed"
              onClick={this.handleInputChange}
              className={ comstatusChecked ? "Checked" : "unChecked" }
              />
          <br/>
          
            <input
              type="button" id="arc"
              name="archived" value="Archived"
              onClick={this.handleInputChange}
              className={ arcChecked ? "Checked" : "unChecked" }
              />
            <input
              type="button" id="una"
              name="archived" value="Unarchived"
              onClick={this.handleInputChange}
              className={ unaChecked ? "Checked" : "unChecked" }
              />
          <br/>

          <input type="submit" value="Submit" />
        </form>
      );
  }
}

export default InputJobForm;
