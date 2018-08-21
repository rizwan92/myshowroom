import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import { Tracker } from 'meteor/tracker'
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom'
import CustomerTable from '../customer/CustomerTable';
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
      this.props.changeTitle('Create Jobsheet')    

    }
    componentDidUpdate() {
      componentHandler.upgradeDom();
    }
    
    autoCompleteOnChange = (value)=>{
      this.setState({search:value},()=>{
        Tracker.autorun(() => {
          if (value !== '' && value.length >= 3) {
            this.setState({isLoading:true})
            Meteor.call('customer.bynames',this.props.credentials.showroomId,value,(err,customers)=>{              
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
      // let jobsheets = []
      // if (this.state.customer !== null) {
      //   let thisCustomer = JSON.parse(JSON.stringify(this.state.customer))
      //   delete thisCustomer.jobsheets; 
      //   let thisCustomerJobsheets = this.state.customer.jobsheets
      //   jobsheets = thisCustomerJobsheets.map((job)=>{
      //     job['customer'] = thisCustomer
      //     return job
      //   })             
      // }      
      return (
        <div>
          <i
            className="material-icons"
            style={{ cursor: 'pointer', fontSize: 50,margin:10 }}
            onClick={() => this.props.history.goBack()}
          >
          keyboard_backspace
          </i>
          <div style={{display:'flex',justifyContent:'center'}}>
            <div style={{display:'flex',justifyContent:'center',padding:20,backgroundColor:'#fff',borderRadius:10}} className="mdl-shadow--2dp">
              <center>
                <h6 style={{color:'black'}}></h6>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}}>
                  <Autocomplete
                    getItemValue={(item) => {
                      return JSON.stringify(item)
                    }}
                    menuStyle={{...styles.menuStyle}}
                    items={this.state.items}
                    renderItem={(item, isHighlighted) =>{
                      return (
                        <div className=" " key={item._id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                          <li className="mdl-list__item">
                            <span className="mdl-list__item-primary-content" style={{cursor:'pointer'}}>
                              <i className="material-icons mdl-list__item-icon">person</i>
                              <div style={{display:'flex',flexFlow:'column'}}>
                                <span>{item.customerName}</span>
                                <span>{item.customerAddress}</span>
                              </div>
                            </span>
                          </li>
                        </div>
                      )
                    }}
                    value={this.state.search}
                    onChange={(e) =>this.autoCompleteOnChange(e.target.value)}
                    onSelect={(val) =>{
                      this.setState({customer:JSON.parse(val)})
                    }}
          
                    inputProps={{className:'mdl-textfield__input',placeholder:'Search Customer',
                      style:{fontSize:19,}}}
                  />
                  {this.state.isLoading ?
                    <div className="mdl-spinner mdl-js-spinner is-active mdl-js-progress" ></div>
                    :
                    <i className="material-icons">search</i>
                  }

                </div>
                <br />
                <br />

                {
                  this.state.customer === null ? null :
                    <span className="mdl-chip mdl-chip--contact mdl-chip--deletable" style={{padding:10,}}>
                      <span className="mdl-chip__text" style={{fontSize:18}}>{this.state.customer.customerName}</span>
                      <a onClick={()=>this.setState({customer:null})} className="mdl-chip__action" ><i className="material-icons">cancel</i></a>
                      <a  onClick={()=>this.props.history.push(`/customeredit/${this.state.customer._id}`)} className="mdl-chip__action" ><i className="material-icons">create</i></a>
                    </span>
                }
                <br />
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
                  style={{marginTop:20,width:200}}
                  className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                  Create Job Sheet
                </button>
              </center>
            </div>
          </div>
        </div>
      )
    }
    createJobSheet =()=>{
      if (this.state.customer === null) {
        Bert.alert('ग्राहक select kare', 'info', 'growl-top-right');
        return
      }      
      Meteor.call('counter.get',this.props.credentials.showroomId,(err,res)=>{
        if (err) {
          return
        }
        else{
          const jobSheetId = res.year + '-' + res.counter;
          const url  = `/newjobsheet/${jobSheetId}/${this.state.customer._id}/${this.state.type}`
          this.props.history.push(url);
        }
      })
      
    }
}

export default withRouter(CreateJobSheet)


const styles={
  menuStyle:{
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 0',
    fontSize: '90%',
    // width:'30%', 
    position: 'fixed',
    left: '50%',
    top: '45%',
    transform: 'translateX(-50%)',
    overflow: 'auto',
    maxHeight: '50%',
    zIndex:99
  }
}