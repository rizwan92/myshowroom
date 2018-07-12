import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { CustomerApi } from '../../../api/customer';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import  CustomerTable  from './CustomerTable';
import moment from 'moment'
export class Customer extends Component {
  state={
    tab:1
  }
  handleTabChange =(tab)=> this.setState({tab})

  render() {
    if (!this.props.loading) {
      return (
        <div>
          <div className="mdl-spinner mdl-js-spinner is-active myloader"></div>
        </div>
      )
    }
    let thisMonthCount = this.props.customers.length
    let thisWeekCount = this.props.customersOfWeek.length
    let thisDayCount = this.props.customersOfDay.length
    const tab = this.state.tab
    let customers = this.props.customers 
    if (tab === 1 ) {  customers = this.props.customers ;}
    if (tab === 2 ) {  customers = this.props.customersOfWeek ;}
    if (tab === 3 ) {  customers = this.props.customersOfDay ;}
    return (
      <div>
        <h4>Customers Details</h4>
        <div className="mytabbar">
          <div className="demo-card-wide mdl-shadow--2dp" 
            onClick={()=> this.handleTabChange(1)}
            style={{backgroundColor:tab === 1 ? '#efefef' : 'white'}}>
            <div>This Month </div>
            <div>{thisMonthCount}</div>
          </div>
          <div className="demo-card-wide mdl-shadow--2dp" 
            onClick={()=> this.handleTabChange(2)}
            style={{backgroundColor:tab === 2 ? '#efefef' : 'white'}}>
            <div>This Week</div>
            <div>{thisWeekCount}</div>
          </div>
          <div className="demo-card-wide mdl-shadow--2dp"  
            onClick={()=> this.handleTabChange(3)}
            style={{backgroundColor:tab === 3 ? '#efefef' : 'white'}}>
            <div>This Day</div>
            <div>{thisDayCount}</div>
          </div>
        </div>
        <CustomerTable customers={customers} />
      </div>
    )
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe('thisMonthCustomer');
  var startOfMonth = moment().startOf ('month').toDate ();
  var endOfMonth = moment().endOf ('month').toDate ();
  var startOfWeek = moment ().startOf ('week').toDate ();
  var endOfWeek = moment ().endOf ('week').toDate ();
  var d = new Date();
  d.setHours(0,0,0,0);    
  return {
    customers: CustomerApi.find({ createdAt: {$gte: new Date(startOfMonth), $lte: new Date(endOfMonth)}},{sort: {createdAt: -1}}).fetch(),
    customersOfWeek: CustomerApi.find({ createdAt: {$gte: new Date(startOfWeek), $lte: new Date(endOfWeek)}},{sort: {createdAt: -1}}).fetch(),
    customersOfDay: CustomerApi.find({ createdAt: {$gte: d}},{sort: {createdAt: -1}}).fetch(),
    loading:handle.ready()
  };
})(withRouter (Customer));


