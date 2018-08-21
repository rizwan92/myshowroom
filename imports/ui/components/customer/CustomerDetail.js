import React, { Component } from 'react'
import  JobSheetTable  from '../jobsheet/JobSheetTable';
import { Meteor } from 'meteor/meteor'
import { withRouter } from 'react-router-dom'
/*jshint esversion: 6 */
/*global  componentHandler:true */

export class CustomerDetail extends Component {
    state={
      serviceNumber:0,
      freeJobsheetNumber:'',
      paidJobsheetNumber:'',
      customer:null,
    }

    componentDidMount = () => {
      componentHandler.upgradeDom();    
      Meteor.call('customer.singleitem',this.props.match.params.customerId,(err,res)=>{
        if (err) {
          Bert.alert(err, 'danger', 'growl-top-right');
          return
        }
        let freeJobsheetNumber = 0;
        let paidJobsheetNumber = 0;
        res[0].jobsheets.reduce((sum,job)=>{
          if (job.type === 'free') freeJobsheetNumber = freeJobsheetNumber + 1;
          else paidJobsheetNumber = paidJobsheetNumber + 1;
        },0)
        if (this.props.match.params.type === 'free')
          this.setState({customer:res[0],serviceNumber:freeJobsheetNumber+1,freeJobsheetNumber,paidJobsheetNumber})
        else 
          this.setState({customer:res[0],serviceNumber:paidJobsheetNumber+1,freeJobsheetNumber,paidJobsheetNumber})
      })
    }  
    componentDidUpdate() {
      componentHandler.upgradeDom();
    }      
    render() {
      if (this.state.customer === null) {
        return (
          <div>
            <div className="mdl-spinner mdl-js-spinner is-active myloader"></div>
          </div>
        )
      }
     

      let jobsheets = []
      if (this.state.customer !== null) {
        let thisCustomer = JSON.parse(JSON.stringify(this.state.customer))
        delete thisCustomer.jobsheets; 
        let thisCustomerJobsheets = this.state.customer.jobsheets
        jobsheets = thisCustomerJobsheets.map((job)=>{
          job['customer'] = thisCustomer
          return job
        })             
      } 
      return (        
        <div style={{backgroundColor:'#fff',minHeight:'93vh'}} >
          <i
            className="material-icons"
            style={{ cursor: 'pointer', fontSize: 50,margin:10}}
            onClick={() => this.props.history.goBack()}
          >
          keyboard_backspace
          </i>

          <h4 style={{textAlign:'center',margin:0}}>{this.state.customer.customerName}</h4>
          <div className='mysubform'> 
            <div  style={{textAlign:'left',flex:1,paddingLeft:10}}>
              <div> Number:- {this.state.customer.customerNumber}</div>
              <div> Free Servicing:- {this.state.freeJobsheetNumber}</div>
              <div> Paid Servicing:- {this.state.paidJobsheetNumber}</div>
              <div> Address:- {this.state.customer.customerAddress}</div>
              <a style={{cursor:'pointer'}} onClick={()=>this.props.history.push(`/customeredit/${this.state.customer._id}`)}> Edit ?</a>
            </div>
            <div  style={{textAlign:'right',flex:1,paddingRight:10}}>
              <div> Model Number:-  {this.state.customer.vehicleModel}</div>
              <div> Color:-  {this.state.customer.vehicleColor}</div>
              <div> Key Number:-  {this.state.customer.vehicleKeyNumber}</div>
              <div> Engine Number:-  {this.state.customer.vehicleEngineNumber}</div>
              <div> Chessis Number:-  {this.state.customer.vehicleChassisNumber}</div>
            </div>
          </div>

          <hr />
          <JobSheetTable jobsheets={jobsheets} delete={false} />
          <hr />
        </div>
      )
    }
}

export default withRouter(CustomerDetail)
