import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import moment from 'moment'
export class JobSheetTable extends Component {
  render() {
    return (
      <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
        {
          this.props.jobsheets.map((jobsheet,i)=>{
            return(
              <div className="mdl-card mdl-shadow--2dp demo-card-square" key={i}>
                <div className="mdl-card__title mdl-card--expand">
                  <div style={{display:'flex',flexDirection:'column'}}>
                    <div className="" style={{...styles.cardrow,justifyContent:'flex-end'}}><div style={{...styles.idnumber}}>{jobsheet.jobSheetId}</div></div>
                    <div style={styles.cardrow}><i className="material-icons">phone</i>  <div style={styles.margin}>{jobsheet.customer.customerNumber}</div></div>
                    <div style={styles.cardrow}><i className="material-icons">email</i>  <div style={styles.margin}>{jobsheet.customer.customerEmail}</div></div>
                    <div style={styles.cardrow}><i className="material-icons">settings</i>  <div style={styles.margin}>{jobsheet.customer.vehicleModel}</div></div>
                    <div style={styles.cardrow}><i className="material-icons">invert_colors</i>  <div style={styles.margin}>{jobsheet.customer.vehicleColor}</div></div>
                    <div style={styles.cardrow}><i className="material-icons">date_range</i>  <div style={styles.margin}>{moment(jobsheet.createdAt).format('DD-MM-YYYY')}</div></div>
                  </div>
                </div>
                <div className="mdl-card__supporting-text">
                  <h2 className="mdl-card__title-text">
                    <div style={styles.cardrow}><i className="material-icons">perm_identity</i>  <div style={styles.margin}>{jobsheet.customer.customerName}</div></div>
                  </h2>   
                </div>
                <div className="mdl-card__actions mdl-card--border">
                  <a className="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect"
                    onClick={()=>this.viewJobSheet(jobsheet)}>
                    Details
                  </a>
                  {
                    this.props.delete ? <div className="mdl-card__menu">
                      <i className="material-icons" style={{color:'red'}} onClick={()=> this.deleteJobsheet(jobsheet._id)}>delete</i>
                    </div>
                      :
                      null
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
  deleteJobsheet =(id)=>{
    let result = confirm('Want to delete?');
    if (result) {
      Meteor.call('jobsheet.remove',id);
      window.location = this.props.match.url
    }
  }
  viewJobSheet = (jobsheet) =>{
    const {jobSheetId ,customerId, type} = jobsheet ;
    let {oilLabel, airFilter,taped,spark,corborator,clutch
      ,breake,diveChain,battery,fuel,electrical,cabel,nutBolt,createdAt} = jobsheet
    let mycheck = {oilLabel, airFilter,taped,spark,corborator,clutch
      ,breake,diveChain,battery,fuel,electrical,cabel,nutBolt,createdAt}
    mycheck = JSON.stringify(mycheck)
    const {customerName ,customerNumber, customerEmail, customerAddress, hpd, vehicleModel, vehicleColor,vehicleKeyNumber,vehicleEngineNumber, vehicleChassisNumber, vehicleSoldDealer } = jobsheet.customer ;
    const url  = `/jobsheetform/${jobSheetId}/${customerId}/${customerName}/${customerNumber}/${customerEmail}/${customerAddress}/${hpd}/${vehicleModel}/${vehicleColor}/${vehicleKeyNumber}/${vehicleEngineNumber}/${vehicleChassisNumber}/${vehicleSoldDealer}/${type}/${mycheck}`
    this.props.history.push(url);
  }
}

export default withRouter(JobSheetTable);

const styles ={
  cardrow:{
    display:'flex',
    alignItmes:'center',
  },
  margin:{
    marginLeft:5
  },
  idnumber:{
    fontSize:'1.5rem',border:'1px solid white',padding:2,borderRadius:5
  }
}