import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import './customer.css'
import moment from 'moment'
export class JobSheetTable extends Component {
  render() {
    return (
      <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
        {
          this.props.customers.map((customer,i)=>{
            return(
              <div className="mdl-card mdl-shadow--2dp demo-card-square" key={i}>
                <div className="mdl-card__title mdl-card--expand" style={{background:'#ff9800'}}>
                  <div style={{display:'flex',flexDirection:'column'}}>
                    <div style={styles.cardrow}><i className="material-icons">phone</i>  <div style={styles.margin}>{customer.customerNumber}</div></div>
                    <div style={styles.cardrow}><i className="material-icons">email</i>  <div style={styles.margin}>{customer.customerEmail}</div></div>
                    <div style={styles.cardrow}><i className="material-icons">settings</i>  <div style={styles.margin}>{customer.vehicleModel}</div></div>
                    <div style={styles.cardrow}><i className="material-icons">invert_colors</i>  <div style={styles.margin}>{customer.vehicleColor}</div></div>
                    <div style={styles.cardrow}><i className="material-icons">date_range</i>  <div style={styles.margin}>{  moment(customer.createdAt).format('DD-MM-YYYY')}</div></div>
                  </div>
                </div>
                <div className="mdl-card__supporting-text">
                  <h2 className="mdl-card__title-text">
                    <div style={styles.cardrow}><i className="material-icons">perm_identity</i>  <div style={styles.margin}>{customer.customerName}</div></div>
                  </h2>   
                </div>
                <div className="mdl-card__actions mdl-card--border">
                  <a className="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect"
                    style={{color:'blue'}} onClick={()=>this.props.history.push(`/customeredit/${customer._id}`)}>
                    Details
                  </a>
                  <div className="mdl-card__menu">
                    <i className="material-icons" style={{color:'red'}} onClick={()=> this.deleteCustomer(customer._id)}>delete</i>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
  deleteCustomer =(id)=>{
    let result = confirm('Want to delete?');
    if (result) {
      Meteor.call('jobsheet.remove',id);
    }
  }
}

export default withRouter(JobSheetTable);

const styles ={
  cardrow:{
    display:'flex',
    alignItmes:'center',
  },
  margin:{
    marginLeft:5
  }
}