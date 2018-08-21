import React, { Component } from 'react'
import PrintJobSheet from './PrintJobSheet';
import ReactDOMServer from 'react-dom/server';

import { Meteor } from 'meteor/meteor'
/*global  Bert:true */

export class ViewJobSheet extends Component {

    state ={
      jobsheetDetail:null,
      customerDetail:null,
    }

    print(customerDetail,jobsheetDetail){
      var pri = document.getElementById('myiframe').contentWindow;
      pri.document.open();
      pri.document.write(ReactDOMServer.renderToString(<PrintJobSheet  credentials={this.props.credentials} customerDetail={customerDetail} jobsheetDetail={jobsheetDetail}/>));
      pri.document.close();
      pri.focus();
      pri.print(); 
    }

    componentDidMount = () => {
      this.props.changeTitle('View Jobsheet')    
      Meteor.call('jobsheet.singleitem',this.props.match.params.jobSheetId,(err,res)=>{
        if (err) {
          Bert.alert(err, 'danger', 'growl-top-right');
          return
        }        
        let { oilLabel,airFilter,taped,spark,corborator,clutch,breake,jobSheetId,diveChain,battery,fuel,electrical,cabel,nutBolt,createdAt,type,registrationNumber,hasRun,mad,light,isbattery,toolkit,rml,rmr,dent,scratch,cc,accessories,fuellevel,anya,serviceNumber,oil,typeofoil} = res[0]
        let { customerName,customerNumber,customerEmail,customerAddress,hpd,vehicleModel,vehicleColor,vehicleKeyNumber,vehicleEngineNumber,vehicleChassisNumber,vehicleSoldDealer} = res[0].customer 
        const jobsheetDetail = {oilLabel,airFilter,taped,spark,corborator,clutch,breake,diveChain,battery,fuel,electrical,cabel,nutBolt,createdAt,registrationNumber,hasRun,mad,light,isbattery,toolkit,rml,rmr,dent,scratch,cc,accessories,fuellevel,anya,serviceNumber,oil,typeofoil,jobSheetId,type}
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
            <PrintJobSheet  credentials={this.props.credentials} customerDetail={customerDetail} jobsheetDetail={jobsheetDetail} />
          </div>
          <button  onClick={()=>this.print(customerDetail,jobsheetDetail)}
            style={{margin:10}}
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                Print
          </button>
        </div>
      )
    }
}

export default ViewJobSheet
