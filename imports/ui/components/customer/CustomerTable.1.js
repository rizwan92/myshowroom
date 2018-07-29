import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import './customer.css'
import moment from 'moment'


const  CustomerTable1 = (props)=>{
  if (Meteor.isCordova) {
    return <ForCordova {...props}/>
  }else{
    return(
      <ForWeb {...props}/>
    )
  }
}

export default withRouter(CustomerTable1)


class ForWeb extends Component {
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
                  <div className="mdl-card__title-text">
                    <div style={styles.cardrow}><i className="material-icons">perm_identity</i>  <div style={styles.margin}>{customer.customerName}</div></div>
                  </div>   
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





class ForCordova extends Component {
  render() {
    return (
      <ul className="demo-list-two mdl-list">
        {
          this.props.customers.map((customer,i)=>{
            return(
              <li className="mdl-list__item mdl-list__item--two-line" key={i}
                style={{height:70}}>
                <span className="mdl-list__item-primary-content" onClick={()=>this.props.history.push(`/customeredit/${customer._id}`)}>
                  <i className="material-icons mdl-list__item-avatar">person</i>
                  <span>{customer.customerName}</span>
                  <span className="mdl-list__item-sub-title">{customer.customerNumber}</span>
                  <span className="mdl-list__item-sub-title">{customer.customerEmail}</span>
                  <span style={styles.cardrow} className="mdl-list__item-sub-title">{moment(customer.createdAt).format('DD-MM-YYYY')}</span>
                </span>
                <span className="mdl-list__item-secondary-content">
                  <span className="mdl-list__item-secondary-info">Delete</span>
                  <a className="mdl-list__item-secondary-action" href="#"> <i className="material-icons" 
                    style={{color:'red'}} onClick={()=> this.deleteCustomer(customer._id)}>delete</i></a>
                </span>
              </li>
            )
          })
        }
      </ul>
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


const styles ={
  cardrow:{
    display:'flex',
    alignItmes:'center',
  },
  margin:{
    marginLeft:5,
    fontSize:'1.2rem',
    color:'black'
  }
}