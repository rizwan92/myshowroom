import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';
import  CustomerTable  from '../customer/CustomerTable';
import { Meteor } from 'meteor/meteor'
Meteor.subscribe('thisMonthJobSheet')

export class JobSheet extends Component {
  state={
    tab:1,
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
    const tab = this.state.tab
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
        <CustomerTable customers={[]} />
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    loading:true
  };
})(withRouter (JobSheet));


