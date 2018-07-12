import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import './jobsheet.css'
import PrintJobSheet from './PrintJobSheet';
import ReactDOMServer from 'react-dom/server';
import { withRouter } from 'react-router-dom'
/*global  Bert:true */

export class JobSheetForm extends Component {
   
  state ={
    oilLabel:false,
    airFilter:false,
    taped:false,
    spark:false,
    corborator:false,
    clutch:false,
    breake:false,
    diveChain:false,
    battery:false,
    fuel:false,
    electrical:false,
    cabel:false,
    nutBolt:false,
  }

  
  print(){
    var pri = document.getElementById('myiframe').contentWindow;
    pri.document.open();
    pri.document.write(ReactDOMServer.renderToString(<PrintJobSheet detail={this.props.match.params} mycheck={this.state}/>));
    pri.document.close();
    pri.focus();
    pri.print();
    
  }
  createJobSheet = () => {
    let { jobSheetId,customerId,type}  =  this.props.match.params
    let jobSheet = {
      ...this.state,createdAt:new Date(),status:1,type,jobSheetId
    }
    Meteor.call('customer.createJobSheet','1',customerId,jobSheetId,jobSheet,(err,res)=>{
      if (err) {
        Bert.alert(err, 'danger', 'growl-top-right');
      }
      else {
        this.print()
        Bert.alert('Jobsheet Created', 'success', 'growl-top-right');
        this.props.history.push('/createjobsheet')
      }
    })
        
  }
  render() {      
    return (
      <div>
        <i
          className="material-icons"
          style={{ cursor: 'pointer', fontSize: 40 }}
          onClick={() => this.props.history.goBack()}
        >
          keyboard_backspace
        </i>
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <button  onClick={()=>this.createJobSheet()}
            style={{width:200,margin:10}}
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                  Create Job Sheet
          </button>
        </div>
        <PrintJobSheet detail={this.props.match.params} mycheck={this.state} onCheacked={this.onCheacked}/>
      </div>
    )
  }
  onCheacked=(e)=>{
    if (this.state[[e.target.id]]) {
      this.setState({[e.target.id]:false})  
    }else{
      this.setState({[e.target.id]:true})  
    }
  }
}

export default withRouter(JobSheetForm)

