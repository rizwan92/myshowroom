import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';
import {  JobSheetApi } from '../../../api/jobsheet';
import  JobSheetTable1  from './JobSheetTable.1';
import  JobSheetTable  from './JobSheetTable';
import { Meteor } from 'meteor/meteor'
import moment from 'moment'
// Meteor.subscribe('alljobsheet')
/*jshint esversion: 6 */
/*global  componentHandler:true */

export class JobSheet extends Component {
  state={
    tab:1,
    toggle:false
  }
  handleTabChange =(tab)=> this.setState({tab})
  
  handleToggle =()=> {
    this.setState({toggle:!this.state.toggle})
  }
  
  componentDidMount() {
    componentHandler.upgradeDom();
  }
  componentDidUpdate() {
    componentHandler.upgradeDom();
  }
  
  
  render() {
    if (!this.props.loading) {
      return (
        <div>
          <div className="mdl-spinner mdl-js-spinner is-active myloader"></div>
        </div>
      )
    }
    const tab = this.state.tab
    let thisMonthCount = this.props.jobsheet.length
    let thisWeekCount = this.props.jobsheetOfWeek.length
    let thisDayCount = this.props.jobsheetOfDay.length
    let jobsheet = this.props.jobsheet 
    if (tab === 1 ) {  jobsheet = this.props.jobsheet ;}
    if (tab === 2 ) {  jobsheet = this.props.jobsheetOfWeek ;}
    if (tab === 3 ) {  jobsheet = this.props.jobsheetOfDay ;}
    jobsheet = jobsheet.filter (jobsheet => {
      let name = jobsheet.customer.customerName.toLowerCase ();
      return name.indexOf (this.props.search.toLowerCase ()) !== -1;
    });
    return (
      <div>
        <h6></h6>
        <div className="mytabbar">
          <div className="demo-card-wide mdl-shadow--2dp" 
            onClick={()=> this.handleTabChange(1)}
            style={{backgroundColor:tab === 1 ? '#efefef' : 'white'}}>
            <div>This Month</div>
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
          <div className="demo-card-wide mdl-shadow--2dp"  
            style={styles.toggle}>
            <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect"  htmlFor="switch-1">
              <input type="checkbox" id="switch-1" className="mdl-switch__input" checked={this.state.toggle} onChange={()=>this.handleToggle()}/>
              <span className="mdl-switch__label"></span>
            </label>
          </div>
        </div>
        {this.state.toggle ? 
          <JobSheetTable jobsheets={jobsheet} />
          :  
          <JobSheetTable1 jobsheets={jobsheet} delete={true} />
        }
      </div>
    )
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe('thisMonthJobSheet','1')
  var startOfWeek = moment ().startOf ('week').toDate ();
  var endOfWeek = moment ().endOf ('week').toDate ();
  var d = new Date();
  d.setHours(0,0,0,0);    
  return {
    jobsheet:JobSheetApi.find({}).fetch(),
    jobsheetOfWeek:JobSheetApi.find({ createdAt: {$gte: startOfWeek,$lte:endOfWeek}}).fetch(),
    jobsheetOfDay:JobSheetApi.find({createdAt: {$gte: d}}).fetch(),
    loading:handle.ready()
  };
})(withRouter (JobSheet));


const styles = {
  toggle:{
    width:50
  }
}