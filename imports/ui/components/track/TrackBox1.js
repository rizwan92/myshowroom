import React, { Component } from 'react'
import moment from 'moment'
import { Meteor } from 'meteor/meteor'
/*jshint esversion: 6 */
/*global  componentHandler:true */
export class TrackBox extends Component {
  constructor(props){
    super(props)
    this.process =null
  }
    state= {
      select:0,
      sendSms1:null,
      sendSms2:null,
      servicing:null,
      complete:null,
      progress:0,
      status:'Not Tracking',
      message:'serverving karalo bhai'
    }
makeProgress =(progress)=>{  
  let element  = document.getElementById(`#progress${this.props.number}`)
  let subElement = element.getElementsByClassName('progressbar')
  subElement[0].style.width = `${progress}%`
}
componentDidMount() {
  componentHandler.upgradeDom();
  if (this.props.jobsheet.track) {
    const {sendSms1,sendSms2,servicing,complete,progress} = this.props.jobsheet.track
    let status = 'Not Tracking' 
    if (progress === 25) {
      status = 'SMS (1)'
    }
    if (progress === 50) {
      status = 'SMS (2)'
    }
    if (progress === 75 ) {
      status = 'Servicing'
    }
    this.setState({sendSms1,sendSms2,servicing,complete,progress,status})
  }
}
componentDidUpdate() {
  componentHandler.upgradeDom();
}

showSnackBar(msg){
  var snackbarContainer = document.querySelector('#demo-toast-example');
  var data = {message: msg};
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
}

selectOnChange=(select)=>{  
  this.setState({select},()=>{
    this.onSubmit()
  })
}
onSubmit = ()=>{
  let select  = parseInt(this.state.select)   
  if (select === 0) {
    this.showSnackBar('select the option')
    return
  } 
  switch(select){
  case 1:
    this.sendSms1()
    break;
  case 2:
    this.sendSms2()
    break;
  case 3:
    this.Servicing()
    break;
  case 4:
    this.Complete()
    break;
  default:
    this.makeProgress(0)
  }
}
render() {    
  const { customer } = this.props.jobsheet
  return (
    <tr className="danger-item" >
      <td>
        <p>{customer.customerName}</p>
        <p>{this.props.jobsheet.jobSheetId}</p>
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
        <p>{moment(this.props.jobsheet.createdAt).format('DD-MM-YYYY')+' / '+moment(this.props.jobsheet.createdAt).format('hh-mm')}</p>
        <p>Paid</p>
      </td>
      <td className="status">
        <span className="status-text status-red">{this.state.status}</span>
        <form className="form" action="#" method="POST">
          <select className="action-box" value={this.state.select} onChange={(e)=>this.selectOnChange(e.target.value)}>
            <option value={0}>Action</option>
            <option value={1}>Send SMS</option>
            <option value={2}>Send SMS (2)</option>
            <option value={3}>servicing</option>
            <option value={4}>Complete</option>
          </select>
        </form>
      </td>
    </tr>
  )
}
sendSms1(){
  if (this.state.progress < 25) {
    const {sendSms2,servicing,complete} = this.state
    const progress = this.state.progress < 25 ? 25 : this.state.progress
    const track = {sendSms1:{
      status:true,
      createdAt:new Date(),
      message:this.state.message,
      to:[this.props.jobsheet.customer.customerNumber.toString()]
    },sendSms2,servicing,complete,progress}
    Meteor.call('jobsheet.update',this.props.showroomId,this.props.jobsheet._id,track,(err,res)=>{
      if (err) {
        Bert.alert(err, 'danger', 'growl-top-right');
        return
      }
      this.setState({sendSms1:{
        status:true,
        createdAt:new Date(),
        message:this.state.message,
        to:[this.props.jobsheet.customer.customerNumber.toString()]
      },sendSms2,servicing,complete,progress,status:'SMS (1)'})
    })
  }else{
    this.showSnackBar('already sent')
  }
}
sendSms2(){
  if (this.state.progress < 50) {
    const {sendSms1,servicing,complete} = this.state
    const progress = this.state.progress < 50 ? 50 : this.state.progress
    const track = { sendSms1,sendSms2:{
      status:true,
      createdAt:new Date(),
      message:this.state.message,
      to:[this.props.jobsheet.customer.customerNumber.toString()]
    },servicing,complete,progress}
    Meteor.call('jobsheet.update',this.props.showroomId,this.props.jobsheet._id,track,(err,res)=>{
      if (err) {
        Bert.alert(err, 'danger', 'growl-top-right');
        return
      }
      this.setState({sendSms1,sendSms2:{
        status:true,
        createdAt:new Date(),
        message:this.state.message,
        to:[this.props.jobsheet.customer.customerNumber.toString()]
      },servicing,complete,progress,status:'SMS (2)'})
    })
  }else{
    this.showSnackBar('already sent')
  }
}
// createJobSheet(){
//   const {sendSms1,sendSms2,servicing,complete} = this.state
//   const progress = this.state.progress < 60 ? 60 : this.state.progress
//   const track = { sendSms1,sendSms2,createJobSheet:{status:true,createdAt:new Date()},servicing,complete,progress}
//   Meteor.call('jobsheet.update',this.props.showroomId,this.props.jobsheet._id,track,(err,res)=>{
//     if (err) {
//       Bert.alert(err, 'danger', 'growl-top-right');
//       return
//     }
//     if (this.state.progress < 60) {
//       this.makeProgress(60)
//     }
//     this.setState({sendSms1,sendSms2,createJobSheet:{status:true,createdAt:new Date()},servicing,complete,progress})
//   })
// }
Servicing(){
  if (this.state.progress < 75) {
    const {sendSms1,sendSms2,complete} = this.state
    const progress = this.state.progress < 75 ? 75 : this.state.progress
    const track = { sendSms1,sendSms2,servicing:{status:true,createdAt:new Date()},complete,progress}
    Meteor.call('jobsheet.update',this.props.showroomId,this.props.jobsheet._id,track,(err,res)=>{
      if (err) {
        Bert.alert(err, 'danger', 'growl-top-right');
        return
      }
      this.setState({sendSms1,sendSms2,servicing:{status:true,createdAt:new Date()},complete,progress,status:'SERVICING'})
    })
  }else{
    this.showSnackBar('Servicing has already done')
  }
}
Complete(){
  if (this.state.progress < 100) {
    const {sendSms1,sendSms2,servicing} = this.state
    const progress = this.state.progress < 100 ? 100 : this.state.progress
    const track = {sendSms1,sendSms2,servicing,complete:{status:true,createdAt:new Date()},progress}
    Meteor.call('jobsheet.complete',this.props.jobsheet._id,track,(err,res)=>{
      if (err) {
        Bert.alert(err, 'danger', 'growl-top-right');
        return
      }
      this.setState({sendSms1,sendSms2,servicing,complete:{status:true,createdAt:new Date()},progress,status:'COMPLETE'})
    })
  }
}
}

export default TrackBox


// const styles ={
//   container:{
//     display:'flex',flexDirection:'column',
//     background:'white',
//   },
//   cardrow:{
//     display:'flex',
//     alignItmes:'center',
//   },
//   margin:{
//     marginLeft:5
//   },
//   idnumber:{
//     fontSize:'1.5rem',padding:2,borderRadius:5
//   }
// }