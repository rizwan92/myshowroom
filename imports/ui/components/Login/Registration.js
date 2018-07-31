import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {Meteor} from 'meteor/meteor'
/*global  componentHandler:true */
/*global  Bert:true*/
Meteor.subscribe('allshowroom')
export class Registration extends Component {
    state={
      showroomTitle:'',
      showroomName:'',
      showroomEmail:'',
      showroomPassword:'',
      showroomType:'',
      showroomAddress:'',
      showroomGST:'',
      showroomState:'',
      showroomCity:'',
      showroomContact:'',
    }
    componentDidUpdate() {
      componentHandler.upgradeDom();
    }
    componentDidMount = () =>{ 
      componentHandler.upgradeDom();
    }
    onChange =(e)=> this.setState({[e.target.id]:e.target.value})
    showSnackBar(msg){
      var snackbarContainer = document.querySelector('#demo-toast-example1');
      var data = {message: msg};
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }
    onRegistere = (e)=>{
      e.preventDefault()
      const showroomTitle = this.state.showroomTitle.trim()
      if (showroomTitle === '') {this.showSnackBar('Enter Title Please'); return;}
      const showroomName = this.state.showroomName.trim()
      if (showroomName === '') {this.showSnackBar('Enter showroomName Please'); return;}
      const showroomEmail = this.state.showroomEmail.trim()
      if (showroomEmail === '') {this.showSnackBar('Enter showroomEmail Please'); return;}
      const showroomPassword = this.state.showroomPassword.trim()
      if (showroomPassword === '') {this.showSnackBar('Enter showroomPassword Please'); return;}
      const showroomType = this.state.showroomType.trim()
      if (showroomType === '') {this.showSnackBar('Enter showroomType Please'); return;}
      const showroomGST = this.state.showroomGST.trim()
      const showroomState = this.state.showroomState.trim()
      if (showroomState === '') {this.showSnackBar('Enter showroomState Please'); return;}
      const showroomCity = this.state.showroomCity.trim()
      if (showroomCity === '') {this.showSnackBar('Enter showroomCity Please'); return;}
      const showroomAddress = this.state.showroomAddress.trim()
      if (showroomAddress === '') {this.showSnackBar('Enter showroomAddress Please'); return;}
      let newshowroomContact = this.state.showroomContact.trim()
      if (newshowroomContact === '') {this.showSnackBar('Enter newshowroomContact Please'); return;}
      let showroomContact = newshowroomContact.split(',')
      

      const myshowroom = {
        showroomTitle,showroomName,showroomEmail,showroomPassword,showroomType,showroomAddress,showroomGST,showroomState,showroomCity,showroomContact
      }
      Meteor.call('showroom.insert',myshowroom,(err,res)=>{
        if (err) {
          Bert.alert(err, 'danger', 'growl-top-right');
          return
        }
        Bert.alert('Registered Successfully', 'success', 'growl-top-right');
      })
    }
    render() {
      return (
        <div>
          <center>
            <form  className="myform" onSubmit={(e)=>this.onRegistere(e)}>

              <div className='mysubform'> 
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input myinput" type="text" id="showroomTitle" 
                    onChange={(e)=> this.onChange(e)} value={this.state.showroomTitle}/>
                  <label className="mdl-textfield__label" htmlFor="showroomTitle"> showroomTitle</label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input myinput" type="text" id="showroomName" 
                    onChange={(e)=> this.onChange(e)}  value={this.state.showroomName} />
                  <label className="mdl-textfield__label" htmlFor="showroomName">showroomName</label>
                </div>
              </div>
              
              <div className='mysubform'> 
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input myinput" type="email" id="showroomEmail" 
                    onChange={(e)=> this.onChange(e)} value={this.state.showroomEmail}/>
                  <label className="mdl-textfield__label" htmlFor="showroomEmail"> showroomEmail</label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input myinput" type="text" id="showroomPassword" 
                    onChange={(e)=> this.onChange(e)}  value={this.state.showroomPassword} />
                  <label className="mdl-textfield__label" htmlFor="showroomPassword">showroomPassword</label>
                </div>
              </div>

              <div className='mysubform'> 
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input myinput" type="text" id="showroomType" 
                    onChange={(e)=> this.onChange(e)} value={this.state.showroomType}/>
                  <label className="mdl-textfield__label" htmlFor="showroomType"> showroomType</label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input myinput" type="text" id="showroomAddress" 
                    onChange={(e)=> this.onChange(e)}  value={this.state.showroomAddress} />
                  <label className="mdl-textfield__label" htmlFor="showroomAddress">showroomAddress</label>
                </div>
              </div>

              <div className='mysubform'> 
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input myinput" type="text" id="showroomGST" 
                    onChange={(e)=> this.onChange(e)} value={this.state.showroomGST}/>
                  <label className="mdl-textfield__label" htmlFor="showroomGST"> showroomGST</label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input myinput" type="text" id="showroomState" 
                    onChange={(e)=> this.onChange(e)}  value={this.state.showroomState} />
                  <label className="mdl-textfield__label" htmlFor="showroomState">showroomState</label>
                </div>
              </div>

              <div className='mysubform'> 
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input myinput" type="text" id="showroomCity" 
                    onChange={(e)=> this.onChange(e)} value={this.state.showroomCity}/>
                  <label className="mdl-textfield__label" htmlFor="showroomCity"> showroomCity</label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input myinput" type="text" id="showroomContact" 
                    onChange={(e)=> this.onChange(e)}  value={this.state.showroomContact} />
                  <label className="mdl-textfield__label" htmlFor="showroomContact">showroomContact</label>
                </div>
              </div>

              <button type="submit"
                style={{marginTop:20,width:300}}
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                  save
              </button>

            </form>
          </center>
          <div id="demo-toast-example1" className="mdl-js-snackbar mdl-snackbar">
            <div className="mdl-snackbar__text" style={{fontSize:20}} /> 
            <button className="mdl-snackbar__action" type="button" />
          </div>
        </div>
      ) 
    }
}

export default withRouter(Registration)
