import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import { Tracker } from 'meteor/tracker'
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom'
import JobSheetTable1 from './JobSheetTable.1';
/*global  Bert:true componentHandler:true*/
export class CreateJobSheet extends Component {
    state={
      search:'',
      items:[],
      customer:null,
      isLoading:false,
      type:'free',
    }

    componentDidMount() {
      componentHandler.upgradeDom();
    }
    componentDidUpdate() {
      componentHandler.upgradeDom();
    }
    
    autoCompleteOnChange = (value)=>{
      this.setState({search:value},()=>{
        Tracker.autorun(() => {
          if (value !== '' && value.length >= 3) {
            this.setState({isLoading:true})
            Meteor.call('customer.bynames','1',value,(err,customers)=>{              
              if (err) {
                Bert.alert('something went wrong', 'danger', 'growl-top-right');
              }      
              customers.sort (this.dynamicSort ('customerName'));
              this.setState({items:customers,isLoading:false,search:value})
            })
          }
        })
      })
    }

    dynamicSort (property) {
      var sortOrder = 1;
      if (property[0] === '-') {
        sortOrder = -1;
        property = property.substr (1);
      }
      return function (a, b) {
        var result = a[property] < b[property]
          ? -1
          : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    }
    
    render() {
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
        <div>
          <center>
            <h4>Create Job Sheet</h4>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
              <Autocomplete
                getItemValue={(item) => {
                  return JSON.stringify(item)
                }}
                items={this.state.items}
                renderItem={(item, isHighlighted) =>{
                  return (<div className="serachtextfield" key={item._id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                    {item.customerName}
                  </div>)
                }}
                value={this.state.search}
                onChange={(e) =>this.autoCompleteOnChange(e.target.value)}
                onSelect={(val) =>{
                  this.setState({customer:JSON.parse(val)})
                }}
          
                inputProps={{className:'mdl-textfield__input',placeholder:'Search Customer',
                  style:{fontSize:40,width:400}}}
              />
              {this.state.isLoading ?
                <div className="mdl-spinner mdl-js-spinner is-active mdl-js-progress" ></div>
                :
                null
              }

            </div>
            <br />
            <br />
            <br />

            {
              this.state.customer === null ? null :
                <div>
                  {

                    jobsheets.length === 0 ? <h2>No Record Found</h2> :
                      <JobSheetTable1 jobsheets={jobsheets}/>
                  }
                </div>
            }
            <br />
            <label style={{marginRight:10}} className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="option-1">
              <input type="radio" id="option-1" onChange={()=>this.setState({type:'free'})}
                className="mdl-radio__button" name="options" value="1" checked={this.state.type == 'free'}/>
              <span className="mdl-radio__label">Free</span>
            </label>
            <label style={{marginRight:10}} className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="option-2">
              <input type="radio" id="option-2"  onChange={()=>this.setState({type:'paid'})}
                className="mdl-radio__button" name="options" value="2" checked={this.state.type == 'paid'}/>
              <span className="mdl-radio__label">Paid</span>
            </label>
            <br />
            <br />
            <button onClick={()=>this.createJobSheet()}
              style={{marginTop:20,width:300}}
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                  Create Job Sheet
            </button>

          </center>
        </div>
      )
    }
    createJobSheet =()=>{
      if (this.state.customer === null) {
        Bert.alert('ग्राहक select kare', 'info', 'growl-top-right');
        return
      }
      let customerId = this.state.customer._id;
      let customerName = this.state.customer.customerName;
      let customerNumber = this.state.customer.customerNumber;
      let customerEmail = this.state.customer.customerEmail;
      let customerAddress = this.state.customer.customerAddress;
      let hpd = this.state.customer.hpd
      let vehicleModel = this.state.customer.vehicleModel;
      let vehicleColor = this.state.customer.vehicleColor;
      let vehicleKeyNumber = this.state.customer.vehicleKeyNumber;
      let vehicleEngineNumber = this.state.customer.vehicleEngineNumber;
      let vehicleChassisNumber = this.state.customer.vehicleChassisNumber;
      let vehicleSoldDealer = this.state.customer.vehicleSoldDealer;
      let type = this.state.type;
      Meteor.call('counter.get','1',(err,res)=>{
        if (err) {
          return
        }
        else{
          const jobSheetId = res.year + '-' + res.counter;
          let mycheck = null
          const url  = `/jobsheetform/${jobSheetId}/${customerId}/${customerName}/${customerNumber}/${customerEmail}/${customerAddress}/${hpd}/${vehicleModel}/${vehicleColor}/${vehicleKeyNumber}/${vehicleEngineNumber}/${vehicleChassisNumber}/${vehicleSoldDealer}/${type}/${mycheck}`
          this.props.history.push(url);
        }
      })
      
    }
}

export default withRouter(CreateJobSheet)
