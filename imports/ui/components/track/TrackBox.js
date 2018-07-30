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
    this.setState({sendSms1,sendSms2,servicing,complete,progress},()=>{
      this.makeProgress(progress)            
    })
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

selectOnChange=(select)=> this.setState({select})
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
    <div>
      <div className="mdl-card mdl-shadow--2dp" style={styles.container}>
        <div  style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
          <div style={{flex:1,minWidth:300}}>
            <div className="mdl-card__title mdl-card--expand">
              <div style={{display:'flex',flexDirection:'column'}}>
                <div className="" style={{...styles.cardrow,justifyContent:'flex-start'}}><div style={{...styles.idnumber}}>{this.props.jobsheet.jobSheetId}</div></div>
                <div style={styles.cardrow}><i className="material-icons">phone</i>  <div style={styles.margin}>{customer.customerNumber}</div></div>
                <div style={styles.cardrow}><i className="material-icons">email</i>  <div style={styles.margin}>{customer.customerEmail}</div></div>
                <div style={styles.cardrow}><i className="material-icons">settings</i>  <div style={styles.margin}>{customer.vehicleModel}</div></div>
                <div style={styles.cardrow}><i className="material-icons">invert_colors</i>  <div style={styles.margin}>{customer.vehicleColor}</div></div>
                <div style={styles.cardrow}><i className="material-icons">date_range</i>  <div style={styles.margin}>{moment(new Date(this.props.jobsheet.createdAt)).format('DD-MM-YYYY')}</div></div>
              </div>
            </div>
          </div>
          <div style={{flex:1,minWidth:300}}></div>
          <div style={{flex:1,minWidth:300,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <select className="mdl-textfield__input" style={{width:200}} value={this.state.select} onChange={(e)=>this.selectOnChange(e.target.value)}>
              <option value={0}>Select</option>
              <option value={1}>Send SMS</option>
              <option value={2}>Send SMS (2)</option>
              <option value={3}>servicing</option>
              <option value={4}>Complete</option>
            </select>
            <button 
              style={{margin:10,border:'1px solid gray',color:'black'}}
              className="mdl-button mdl-js-button mdl-button mdl-button--colored"
              onClick={()=>this.onSubmit()}>
                  submit
            </button>
          </div>
        </div>
        <div id={`#progress${this.props.number}`} className="mdl-progress mdl-js-progress" style={{width:'100%',height:10}}></div>
      </div>
    </div>
  )
}
sendSms1(){
  const {sendSms2,servicing,complete} = this.state
  const progress = this.state.progress < 25 ? 25 : this.state.progress
  const track = {sendSms1:{status:true,createdAt:new Date()},sendSms2,servicing,complete,progress}
  Meteor.call('jobsheet.update',this.props.jobsheet._id,track,(err,res)=>{
    if (err) {
      Bert.alert(err, 'danger', 'growl-top-right');
      return
    }
    if (this.state.progress < 25) {
      this.makeProgress(25)
    }
    this.setState({sendSms1:{status:true,createdAt:new Date()},sendSms2,servicing,complete,progress})
  })
}
sendSms2(){
  const {sendSms1,servicing,complete} = this.state
  const progress = this.state.progress < 50 ? 50 : this.state.progress
  const track = { sendSms1,sendSms2:{status:true,createdAt:new Date()},servicing,complete,progress}
  Meteor.call('jobsheet.update',this.props.jobsheet._id,track,(err,res)=>{
    if (err) {
      Bert.alert(err, 'danger', 'growl-top-right');
      return
    }
    if (this.state.progress < 50) {
      this.makeProgress(50)
    }
    this.setState({sendSms1,sendSms2:{status:true,createdAt:new Date()},servicing,complete,progress})
  })
}
// createJobSheet(){
//   const {sendSms1,sendSms2,servicing,complete} = this.state
//   const progress = this.state.progress < 60 ? 60 : this.state.progress
//   const track = { sendSms1,sendSms2,createJobSheet:{status:true,createdAt:new Date()},servicing,complete,progress}
//   Meteor.call('jobsheet.update',this.props.jobsheet._id,track,(err,res)=>{
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
  const {sendSms1,sendSms2,complete} = this.state
  const progress = this.state.progress < 75 ? 75 : this.state.progress
  const track = { sendSms1,sendSms2,servicing:{status:true,createdAt:new Date()},complete,progress}
  Meteor.call('jobsheet.update',this.props.jobsheet._id,track,(err,res)=>{
    if (err) {
      Bert.alert(err, 'danger', 'growl-top-right');
      return
    }
    if (this.state.progress < 75) {
      this.makeProgress(75)
    }
    this.setState({sendSms1,sendSms2,servicing:{status:true,createdAt:new Date()},complete,progress})
  })
}
Complete(){
  const {sendSms1,sendSms2,servicing} = this.state
  const progress = this.state.progress < 100 ? 100 : this.state.progress
  const track = {sendSms1,sendSms2,servicing,complete:{status:true,createdAt:new Date()},progress}
  Meteor.call('jobsheet.complete',this.props.jobsheet._id,track,(err,res)=>{
    if (err) {
      Bert.alert(err, 'danger', 'growl-top-right');
      return
    }
    if (this.state.progress < 100) {
      this.makeProgress(100)
    }
    this.setState({sendSms1,sendSms2,servicing,complete:{status:true,createdAt:new Date()},progress})
  })
}
}

export default TrackBox


const styles ={
  container:{
    width:'100%',display:'flex',flexDirection:'column',
    background:'#FFC107',margin:10
  },
  cardrow:{
    display:'flex',
    alignItmes:'center',
  },
  margin:{
    marginLeft:5
  },
  idnumber:{
    fontSize:'1.5rem',padding:2,borderRadius:5
  }
}