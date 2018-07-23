import React, { Component } from 'react'
import {Meteor} from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data';
import {  JobSheetApi } from '../../../api/jobsheet';
import { withRouter } from 'react-router-dom'
import './track.css'
import  TrackBox  from './TrackBox';
export class Track extends Component {
 componentDidMount = () => {
 
 }
    
 render() {
   return (
     <div>
       {
         this.props.jobsheet.map((job,i)=>{
           return (
             <TrackBox number={i} jobsheet={job}  key={i}/>
           )
         })
       }
     </div>
   )
 }
}

export default withTracker(() => {
  let numberOfDays = localStorage.getItem('numberOfDays') === null ? 45 : localStorage.getItem('numberOfDays')
  const handle = Meteor.subscribe('thisMonthTrackJobSheet','1',numberOfDays)
  return {
    jobsheet:JobSheetApi.find({}).fetch(),
    loading:handle.ready()
  };
})(withRouter (Track));


