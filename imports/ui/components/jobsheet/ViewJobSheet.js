import React, { Component } from 'react'
import PrintJobSheet from './PrintJobSheet';
import { Meteor } from 'meteor/meteor'
/*global  Bert:true */

export class ViewJobSheet extends Component {

    state ={
      jobsheetDetail:null,
      customerDetail:null,
    }

    componentDidMount = () => {
      this.props.changeTitle('View Jobsheet')    
      Meteor.call('jobsheet.singleitem',this.props.match.params.jobSheetId,(err,res)=>{
        if (err) {
          Bert.alert(err, 'danger', 'growl-top-right');
          return
        }        
        let { oilLabel,airFilter,taped,spark,corborator,clutch,breake,jobSheetId,diveChain,battery,fuel,electrical,cabel,nutBolt,createdAt,type,registrationNumber,hasRun} = res[0]
        let { customerName,customerNumber,customerEmail,customerAddress,hpd,vehicleModel,vehicleColor,vehicleKeyNumber,vehicleEngineNumber,vehicleChassisNumber,vehicleSoldDealer} = res[0].customer 
        const jobsheetDetail = {oilLabel,airFilter,taped,spark,corborator,clutch,breake,diveChain,battery,fuel,electrical,cabel,nutBolt,createdAt,registrationNumber,hasRun,jobSheetId,type}
        let customerDetail = { customerName,customerNumber,customerEmail,customerAddress,hpd,vehicleModel,vehicleColor,vehicleKeyNumber,vehicleEngineNumber,vehicleChassisNumber,vehicleSoldDealer}
        this.setState({jobsheetDetail,customerDetail})
      })
    }
    
    render() {
      if (this.state.jobsheetDetail === null) {
        return (
          <div>
            <div className="mdl-spinner mdl-js-spinner is-active myloader"></div>
          </div>
        )
      }
      let jobsheetDetail = this.state.jobsheetDetail
      let customerDetail = this.state.customerDetail
      return (
        <div style={{backgroundColor:'#fff',display:'flex',justifyContent:'center',padding:5}}>
          <i
            className="material-icons"
            style={{ cursor: 'pointer', fontSize: 50,margin:10}}
            onClick={() => this.props.history.goBack()}
          >
          keyboard_backspace
          </i>
          <div >
            <PrintJobSheet  customerDetail={customerDetail} jobsheetDetail={jobsheetDetail} />
          </div>
        </div>
      )
    }
}

export default ViewJobSheet
