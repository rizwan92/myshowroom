import React, { Component } from 'react'
import {Meteor} from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data';
import {  JobSheetApi } from '../../../api/jobsheet';
import { withRouter } from 'react-router-dom'
import './track.css'
import  TrackBox  from './TrackBox';
import Modal from '../Modal';
export class Track extends Component {
  
  state={
    select:localStorage.getItem('numberOfDays') === null ? 30 : localStorage.getItem('numberOfDays'),
    isModalOpen:false
  }
  
  openModal =()=>this.setState({isModalOpen:true})
  closeModal =()=>this.setState({isModalOpen:false})
  
  selectOnChange =(select)=>{
    localStorage.setItem('numberOfDays',select)
    this.setState({select})
    location.reload()
  }
  componentDidMount = () => {
    document.addEventListener('backbutton', this.handleBackButton, false);
  }
  
  handleBackButton=(event)=>{
    event.preventDefault();
    event.stopPropagation();        
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
   
    return (
      <div>
        <h6></h6>
        <div style={{display:'flex',flex:1,justifyContent:'flex-end'}} >
          <div className="demo-card-wide mdl-shadow--2dp" id="customerselect" >
            <select className="mdl-textfield__input"  value={this.state.select} onChange={(e)=>this.selectOnChange(e.target.value)}>
              <option value={0}>Select number of Days old Customer ? </option>
              {
                data.map((d,i)=>{
                  return(
                    <option value={d.value} key={i}>{d.text}</option>
                  )
                })
              }
            </select>
          </div>
        </div>
        {
          this.props.jobsheet.map((job,i)=>{
            return (
              <TrackBox number={i} jobsheet={job}  key={i}/>
            )
          })
        }
        <button style={{position:'fixed',bottom:20,right:20,zIndex:10}}
          className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
          id="customerfilter"
          onClick={()=>this.setState({isModalOpen:!this.state.isModalOpen})}>
          <i className="material-icons">filter_list</i>
        </button>
        <Modal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          style={modalStyle}>
          <div >
            <ul className="demo-list-control mdl-list">
              {
                data.map((d,i)=>{
                  return(
                    <li className="mdl-list__item" key={i}  onClick={()=>this.selectOnChange(d.value)}>
                      <span className="mdl-list__item-primary-content">{d.text}</span>
                      <span className="mdl-list__item-secondary-action">
                        <label className="demo-list-radio mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor={`list-option-${i}`}>
                          <input type="radio" id={`list-option-${i}`}className="mdl-radio__button" name="options" value="1"
                            onClick={()=>this.selectOnChange(d.value)}
                            onChange={()=>{}}
                            checked={d.value == this.state.select} />
                        </label>
                      </span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </Modal>
      </div>
    )
  }
}

export default withTracker(() => {
  let numberOfDays = localStorage.getItem('numberOfDays') === null ? 45 : localStorage.getItem('numberOfDays')  
  const handle = Meteor.subscribe('thisMonthTrackJobSheet','1',numberOfDays)
  return {
    jobsheet:JobSheetApi.find({}).fetch(),
    loading:handle.ready()
  };
})(withRouter (Track));


const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0,0.5)'
  }
};

const data = [
  {text:'10  Days old Customer' ,value:10},
  {text:'20  Days old Customer' ,value:20},
  {text:'30  Days old Customer' ,value:30},
  {text:'40  Days old Customer' ,value:40},
  {text:'50  Days old Customer' ,value:50},
  {text:'60  Days old Customer' ,value:60},
  {text:'70  Days old Customer' ,value:70},
  {text:'80  Days old Customer' ,value:80},
  {text:'90  Days old Customer' ,value:90},
  {text:'100  Days old Customer' ,value:100},
]