import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';
import {  JobSheetApi } from '../../../api/jobsheet';
import  JobSheetTable  from './JobSheetTable';
import { Meteor } from 'meteor/meteor'
import moment from 'moment'


export class JobSheet extends Component {
  state={
    tab:1,
  }
  handleTabChange =(tab)=> this.setState({tab})

  componentDidMount = () => {
    // Meteor.call('jobsheet.get',(err,res)=>{
    //   console.log(err);
    //   console.log(res);
    // })
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
    // console.log(this.props);
    
    return (
      <div>
        <h4> Jobsheet Details</h4>
        <div className="mytabbar">
          <div className="demo-card-wide mdl-shadow--2dp" 
            onClick={()=> this.handleTabChange(1)}
            style={{backgroundColor:tab === 1 ? '#efefef' : 'white'}}>
            <div>This Month</div>
            <div>213</div>
          </div>
          <div className="demo-card-wide mdl-shadow--2dp" 
            onClick={()=> this.handleTabChange(2)}
            style={{backgroundColor:tab === 2 ? '#efefef' : 'white'}}>
            <div>This Week</div>
            <div>654</div>
          </div>
          <div className="demo-card-wide mdl-shadow--2dp"  
            onClick={()=> this.handleTabChange(3)}
            style={{backgroundColor:tab === 3 ? '#efefef' : 'white'}}>
            <div>This Day</div>
            <div>4</div>
          </div>
        </div>
        <JobSheetTable customers={[]} />
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


