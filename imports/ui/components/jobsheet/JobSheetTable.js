import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
export class JobSheetTable extends Component {
  render() {
    return (
      <table style={{width:'100%'}} className="mdl-data-table mdl-js-data-table  mdl-shadow--2dp">
        <thead>
          <tr>
            <th>Job Sheet Id</th>
            <th>Customer Name</th>
            <th>Mob Number</th>
            <th>Email</th>
            <th>Vehicle Model</th>
            <th>Vehicle Color</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.jobsheets.map((jobsheet,i)=>{
              return(
                <tr key={i}>
                  <td>{jobsheet.jobSheetId}</td>
                  <td >{jobsheet.customer.customerName}</td>
                  <td>{jobsheet.customer.customerNumber}</td>
                  <td>{jobsheet.customer.customerEmail}</td>
                  <td>{jobsheet.customer.vehicleModel}</td>
                  <td>{jobsheet.customer.vehicleColor}</td>
                  <td><i className="material-icons" style={{color:'blue'}}  onClick={()=>this.viewJobSheet(jobsheet)}>remove_red_eye</i></td>
                  <td><i className="material-icons" style={{color:'red'}} onClick={()=> this.deleteJobsheet(jobsheet._id)}>delete</i></td>
                </tr>
              ) 
            })
          }
        </tbody>
      </table>
    )
  }
  deleteJobsheet =(id)=>{
    let result = confirm('Want to delete?');
    if (result) {
      this.showSnackBar('Successfully Deleted')
      Meteor.call('jobsheet.remove',id);
      window.location = this.props.match.url
    }
  }
  viewJobSheet = (jobsheet) =>{
    const url  = `/jobsheetform/${jobsheet._id}/null`
    this.props.history.push(url);
  }
  showSnackBar(msg){
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {message: msg};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }
}

export default withRouter(JobSheetTable);
