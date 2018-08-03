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
    select:localStorage.getItem('numberOfDays') === null ? 0 : localStorage.getItem('numberOfDays'),
    isModalOpen:false
  }
  
  openModal =()=>this.setState({isModalOpen:true})
  closeModal =()=>this.setState({isModalOpen:false})
  
  selectOnChange =(select)=>{
    if (select === '0' ) {
      this.showSnackBar('Please Select Any Month')
      return
    }
    localStorage.setItem('numberOfDays',select)
    this.setState({select})
    location.reload()
  }
  componentDidMount = () => {
    this.props.changeTitle('Track')
  }
  showSnackBar(msg){
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {message: msg};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }
  
  // handleBackButton=(event)=>{
  //   event.preventDefault();
  //   event.stopPropagation();        
  //   if (this.state.isModalOpen) { 
  //     this.closeModal()
  //   }else{
  //     this.props.history.goBack()
  //   }
  // }

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
              <option value={0}>Select Month </option>
              {
                data.map((d,i)=>{
                  return(
                    <option value={d.text} key={i}>{d.text}</option>
                  )
                })
              }
            </select>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',flex:'1',alignItems:'center'}}>
          {
            this.props.jobsheet.map((job,i)=>{
              return (
                <TrackBox number={i} jobsheet={job}  key={i} credentials={this.props.credentials}/>
              )
            })
          }
        </div>
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
                    <li className="mdl-list__item" key={i}  onClick={()=>this.selectOnChange(d.text)}>
                      <span className="mdl-list__item-primary-content">{d.text}</span>
                      <span className="mdl-list__item-secondary-action">
                        <label className="demo-list-radio mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor={`list-option-${i}`}>
                          <input type="radio" id={`list-option-${i}`}className="mdl-radio__button" name="options" value="1"
                            onClick={()=>this.selectOnChange(d.text)}
                            onChange={()=>{}}
                            checked={d.text == this.state.select} />
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

export default withTracker((props) => {
  let numberOfDays = localStorage.getItem('numberOfDays') === null ? 45 : localStorage.getItem('numberOfDays')  
  const handle = Meteor.subscribe('thisMonthTrackJobSheet',props.credentials.showroomId,numberOfDays)
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
  {text:'January', value:1},
  {text:'February' ,value:2},
  {text:'March' ,value:3},
  {text:'April' ,value:4},
  {text:'May' ,value:5},
  {text:'Jun' ,value:6},
  {text:'July' ,value:7},
  {text:'August' ,value:8},
  {text:'September' ,value:9},
  {text:'October' ,value:10},
  {text:'November' ,value:11},
  {text:'December' ,value:12},
]