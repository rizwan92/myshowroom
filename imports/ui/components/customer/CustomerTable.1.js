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

  state={
    select:localStorage.getItem('customerMonth') === null ? 0 : localStorage.getItem('customerMonth'),
  }


  onChange=(value,id)=>{    
    if (value == 0) {
      this.showSnackBar('Please Select');
      return;
    }
    if (value ==1) {
      this.props.history.push(`/customeredit/${id}`)
    }
    if (value == 2) {
      this.deleteCustomer(id)
    }
  }
  selectOnChange =(select)=>{
    if (select === '0' ) {
      this.showSnackBar('Please Select Any Month')
      return
    }
    localStorage.setItem('customerMonth',select)
    this.setState({select})
    location.reload()
  }
  render() {    
    return (
      <div className="container projects">
        <div className="projects-inner">
          <header className="projects-header">
            <div className="title">Customer Details</div>
            <div className="count">| 32 customer this month</div>
            <span className="glyphicon glyphicon-download-alt" />
            <div style={{display:'flex',flex:1,justifyContent:'flex-end'}} >
              <div className=" mdl-shadow--2dp" id="customerselect" style={{backgroundColor:'white',color:'black'}} >
                <select className="mdl-textfield__input"  value={this.state.select} onChange={(e)=>this.selectOnChange(e.target.value)}>
                  <option value={0}>Select Month </option>
                  {
                    data.map((d,i)=>{
                      return(
                        <option value={d.text} key={i}>{d.text}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
          </header>
          <table className="projects-table">
            <thead>
              <tr>
                <th>Customer </th>
                <th>Mobile Number/Email</th>
                <th>Vehicle Detail</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.customers.map((customer,i)=>{
                  return(
                    <tr className="danger-item" key={i}>
                      <td>
                        <p style={{color:'white',fontSize:15}}><a style={{cursor:'pointer'}} onClick={()=>this.props.history.push(`/customerdetail/${customer._id}`)}>{customer.customerName}</a></p>
                        <p>{moment(customer.createdAt).format('DD-MM-YYYY')+' / '+moment(customer.createdAt).format('hh-mm')}</p>
                      </td>
                      <td>
                        <p>{customer.customerNumber}</p>
                        <p className="danger-text">{customer.customerEmail}</p>
                      </td>
                      <td className="member">
                        {/* <figure>
                          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_8.png" />
                        </figure> */}
                        <div className="member-info">
                          <p>{customer.vehicleModel}</p>
                          <p>{customer.vehicleColor}</p>
                        </div>
                      </td>
                      <td>
                        <p>{customer.vehicleChassisNumber}</p>
                        <p>{customer.vehicleEngineNumber}</p>
                      </td>
                      <td className="status">
                        <select className="action-box" onChange={(e)=>this.onChange(e.target.value,customer._id)}>
                          <option value={0}>Actions</option>
                          <option value={1}>Edit</option>
                          <option value={2}>Delete</option>
                        </select>
                      </td>
                    </tr>
                  )
                })
              }
             

            </tbody>
          </table>
        </div>
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

const data = [
  {text:'January', value:1},
  {text:'February' ,value:2},
  {text:'March' ,value:3},
  {text:'April' ,value:4},
  {text:'May' ,value:5},
  {text:'Jun' ,value:6},
  {text:'July' ,value:7},
  {text:'August' ,value:8},
  {text:'September' ,value:9},
  {text:'October' ,value:10},
  {text:'November' ,value:11},
  {text:'December' ,value:12},
]
// class ForWeb extends Component {
//   render() {
//     return (
//       <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
//         {
//           this.props.customers.map((customer,i)=>{
//             return(
//               <div className="mdl-card mdl-shadow--2dp demo-card-square" key={i}>
//                 <div className="mdl-card__title mdl-card--expand" style={{background:'#ff9800'}}>
//                   <div style={{display:'flex',flexDirection:'column'}}>
//                     <div style={styles.cardrow}><i className="material-icons">phone</i>  <div style={styles.margin}>{customer.customerNumber}</div></div>
//                     <div style={styles.cardrow}><i className="material-icons">email</i>  <div style={styles.margin}>{customer.customerEmail}</div></div>
//                     <div style={styles.cardrow}><i className="material-icons">settings</i>  <div style={styles.margin}>{customer.vehicleModel}</div></div>
//                     <div style={styles.cardrow}><i className="material-icons">invert_colors</i>  <div style={styles.margin}>{customer.vehicleColor}</div></div>
//                     <div style={styles.cardrow}><i className="material-icons">date_range</i>  <div style={styles.margin}>{  moment(customer.createdAt).format('DD-MM-YYYY')}</div></div>
//                   </div>
//                 </div>
//                 <div className="mdl-card__supporting-text">
//                   <div className="mdl-card__title-text">
//                     <div style={styles.cardrow}><i className="material-icons">perm_identity</i>  <div style={styles.margin}>{customer.customerName}</div></div>
//                   </div>   
//                 </div>
//                 <div className="mdl-card__actions mdl-card--border">
//                   <a className="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect"
//                     style={{color:'blue'}} onClick={()=>this.props.history.push(`/customeredit/${customer._id}`)}>
//                     Details
//                   </a>
//                   <div className="mdl-card__menu">
//                     <i className="material-icons" style={{color:'red'}} onClick={()=> this.deleteCustomer(customer._id)}>delete</i>
//                   </div>
//                 </div>
//               </div>
//             )
//           })
//         }
//       </div>
//     )
//   }
//   deleteCustomer =(id)=>{
//     let result = confirm('Want to delete?');
//     if (result) {
//       this.showSnackBar('Successfully Deleted')
//       Meteor.call('customer.remove',id);
//     }
//   }
//   showSnackBar(msg){
//     var snackbarContainer = document.querySelector('#demo-toast-example');
//     var data = {message: msg};
//     snackbarContainer.MaterialSnackbar.showSnackbar(data);
//   }
// }





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