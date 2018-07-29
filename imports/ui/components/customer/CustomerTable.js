import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
export class CustomerTable extends Component {
  render() {
    return (
      <table style={{width:'100%'}} className="mdl-data-table mdl-js-data-table  mdl-shadow--2dp">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Mob Number</th>
            <th>email</th>
            <th>vehicleModel</th>
            <th>vehicleColor</th>
            <th>vehicleSoldDealer</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.customers.map((customer,i)=>{
              return(
                <tr key={i}>
                  <td >{customer.customerName}</td>
                  <td>{customer.customerNumber}</td>
                  <td>{customer.customerEmail}</td>
                  <td>{customer.vehicleModel}</td>
                  <td>{customer.vehicleColor}</td>
                  <td>{customer.vehicleSoldDealer}</td>
                  <td><i className="material-icons" style={{color:'blue'}} onClick={()=>this.props.history.push(`/customeredit/${customer._id}`)}>create</i></td>
                  <td><i className="material-icons" style={{color:'red'}} onClick={()=> this.deleteCustomer(customer._id)}>delete</i></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
  deleteCustomer =(id)=>{
    let result = confirm('Want to delete?');
    if (result) {
      this.showSnackBar('Successfully Deleted')
      Meteor.call('customer.remove',id);
    }
  }
  showSnackBar(msg){
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {message: msg};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }
}

export default withRouter(CustomerTable);
