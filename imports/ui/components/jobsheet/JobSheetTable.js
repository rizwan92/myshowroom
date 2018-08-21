import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import moment from 'moment'

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
            <th>Vehicle Details</th>
            <th>Jobsheet Detail</th>
            {/* <th>View</th> */}
          </tr>
        </thead>
        <tbody>
          {
            this.props.jobsheets.map((jobsheet,i)=>{
              if (jobsheet.jobSheetId === 'dummy') {
                return false
              }
              let jobsheetyearandid = jobsheet.jobSheetId.split('-')
              return(
                <tr key={i}>
                  <td>{jobsheetyearandid[0].substring(jobsheetyearandid[0].length-2,jobsheetyearandid[0])+jobsheetyearandid[1]}<p>{jobsheet.type}</p></td>
                  <td><a style={{color:'blue',cursor:'pointer'}}  onClick={()=>this.viewJobSheet(jobsheet)}>{jobsheet.customer.customerName}</a></td>
                  <td>{jobsheet.customer.customerNumber}</td>
                  <td>{jobsheet.customer.customerEmail}</td>
                  <td>{jobsheet.customer.vehicleModel}<p>{jobsheet.customer.vehicleColor}</p></td>
                  <td>{moment(jobsheet.createdAt).fromNow()}<p>{moment(jobsheet.createdAt).format('DD/MM/YYYY')}</p></td>
                  {/* <td><i className="material-icons" style={{color:'blue'}}  onClick={()=>this.viewJobSheet(jobsheet)}>remove_red_eye</i></td> */}
                  {this.props.delete ? <td><i className="material-icons" style={{color:'red'}} onClick={()=> this.deleteJobsheet(jobsheet._id)}>delete</i></td>: null}
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
    const url  = `/viewjobsheet/${jobsheet._id}`
    this.props.history.push(url);
  }
  showSnackBar(msg){
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {message: msg};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }
}

export default withRouter(JobSheetTable);
