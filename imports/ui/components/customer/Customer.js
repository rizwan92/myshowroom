import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { CustomerApi } from '../../../api/customer';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import  CustomerTable  from './CustomerTable';
import moment from 'moment'
import CustomerTable1 from './CustomerTable.1';
import Modal from '../Modal';

/*jshint esversion: 6 */
/*global  componentHandler:true */

export class Customer extends Component {
  state={
    tab:1,
    toggle:false,
    isModalOpen:false
  }
  openModal =()=>this.setState({isModalOpen:true})
  closeModal =()=>this.setState({isModalOpen:false})

  handleTabChange =(tab)=>{
    componentHandler.upgradeDom();   
    this.setState({tab,isModalOpen:false})
  }
  
  handleToggle =()=> {
    this.setState({toggle:!this.state.toggle})      
  }
  componentDidMount() {
    componentHandler.upgradeDom();
    document.addEventListener('deviceready', this.onDeviceReady, false);
  }
  componentDidUpdate() {
    componentHandler.upgradeDom();
  }
  onDeviceReady = ()=>{
    document.addEventListener('backbutton', this.handleBackButton, false);
  }
  
  handleBackButton=(event)=>{
    event.stopPropagation();        
    event.preventDefault();
    if (this.state.isModalOpen) { 
      this.closeModal()
    }else{
      this.props.history.goBack()
    }
  }
  
  
  render() {
    if (!this.props.loading) {
      return (
        <div>
          <div className="mdl-spinner mdl-js-spinner is-active myloader"></div>
        </div>
      )
    }
    
    let thisMonthCount = this.props.customers.length
    let thisWeekCount = this.props.customersOfWeek.length
    let thisDayCount = this.props.customersOfDay.length
    const tab = this.state.tab
    let customers = this.props.customers 
    if (tab === 1 ) {  customers = this.props.customers ;}
    if (tab === 2 ) {  customers = this.props.customersOfWeek ;}
    if (tab === 3 ) {  customers = this.props.customersOfDay ;}
    let toggle = this.state.toggle    
    customers = customers.filter (cutomer => {
      let name = cutomer.customerName.toLowerCase ();
      return name.indexOf (this.props.search.toLowerCase ()) !== -1;
    });    
    return (
      <div>
        <h6></h6>
        <div className="mytabbar">
          <div className="demo-card-wide mdl-shadow--2dp" 
            onClick={()=> this.handleTabChange(1)}
            style={{backgroundColor:tab === 1 ? '#efefef' : 'white'}}>
            <div>This Month </div>
            <div>{thisMonthCount}</div>
          </div>
          <div className="demo-card-wide mdl-shadow--2dp" 
            onClick={()=> this.handleTabChange(2)}
            style={{backgroundColor:tab === 2 ? '#efefef' : 'white'}}>
            <div>This Week</div>
            <div>{thisWeekCount}</div>
          </div>
          <div className="demo-card-wide mdl-shadow--2dp"  
            onClick={()=> this.handleTabChange(3)}
            style={{backgroundColor:tab === 3 ? '#efefef' : 'white'}}>
            <div>This Day</div>
            <div>{thisDayCount}</div>
          </div>
          <div className="demo-card-wide mdl-shadow--2dp"  
            style={styles.toggle}>
            <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect"  htmlFor="switch-1">
              <input type="checkbox" id="switch-1" className="mdl-switch__input" checked={toggle} onChange={()=>this.handleToggle()}/>
              <span className="mdl-switch__label"></span>
            </label>
          </div>
        </div>
        {
          this.state.toggle ? 
            <div>
              {customers.length === 0 ? <h6>No records Available</h6>:<CustomerTable customers={customers} />}
            </div>
            :
            <div>
              {customers.length === 0 ? <h6>No records Available</h6>:<CustomerTable1 customers={customers} />}
            </div>
        }
        <button style={{position:'fixed',bottom:20,right:20,zIndex:10}}
          className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
          id="customerfilter"
          onClick={()=>this.setState({isModalOpen:!this.state.isModalOpen})}>
          <i className="material-icons">filter_list</i>
        </button>
        { this.state.isModalOpen ?<Modal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          style={modalStyle}>
          <div >
            <ul className="demo-list-control mdl-list">
              {
                data.map((d,i)=>{  
                  return(
                    <li className="mdl-list__item" key={i}  onClick={()=>this.handleTabChange(d.value)}>
                      <span className="mdl-list__item-primary-content">{d.text}</span>
                      <span className="mdl-list__item-secondary-action">
                        <label className="demo-list-radio mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor={`list-option-${i+100}`}>
                          <input type="radio" id={`list-option-${i+100}`}className="mdl-radio__button" name="options" value="1"
                            onClick={()=>this.handleTabChange(d.value)}
                            onChange={()=>{}}
                            checked={d.value == tab} />
                        </label>
                      </span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </Modal>: null}
      </div>
    )
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe('thisMonthCustomer');
  var startOfMonth = moment().startOf ('month').toDate ();
  var endOfMonth = moment().endOf ('month').toDate ();
  var startOfWeek = moment ().startOf ('week').toDate ();
  var endOfWeek = moment ().endOf ('week').toDate ();
  var d = new Date();
  d.setHours(0,0,0,0);      
  return {
    customers: CustomerApi.find({ createdAt: {$gte: new Date(startOfMonth), $lte: new Date(endOfMonth)}},{sort: {createdAt: -1}}).fetch(),
    customersOfWeek: CustomerApi.find({ createdAt: {$gte: new Date(startOfWeek), $lte: new Date(endOfWeek)}},{sort: {createdAt: -1}}).fetch(),
    customersOfDay: CustomerApi.find({ createdAt: {$gte: d}},{sort: {createdAt: -1}}).fetch(),
    loading:handle.ready(),
  };
})(withRouter (Customer));

const data =[
  {text:'This Month',value:1},
  {text:'This Week',value:2},
  {text:'This Day',value:3},
]

const styles = {
  toggle:{
    width:50
  }
}
const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0,0.5)'
  }
};
