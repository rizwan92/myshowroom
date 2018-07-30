import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
export class AdminLogin extends Component {
    state ={
      email:'',
      password:''
    }
  /*jshint esversion: 6 */
  /*global  componentHandler:true */
 onChange =(e)=>this.setState({[e.target.id]:e.target.value})

 showSnackBar(msg){
   var snackbarContainer = document.querySelector('#demo-toast-example1');
   var data = {message: msg};
   snackbarContainer.MaterialSnackbar.showSnackbar(data);
 }

 componentDidMount() {
   componentHandler.upgradeDom();    
 }
 componentDidUpdate() {
   componentHandler.upgradeDom();
 }

 onSubmit(e){
   e.preventDefault()
   const email = this.state.email.trim()
   const password = this.state.password.trim()
   if (email === '') {this.showSnackBar('Enter Email Please'); return;}
   if (password === '') {this.showSnackBar('Enter Password Please'); return;}
   console.log(email);
   console.log(password);



 }

 render() {
   return (
     <div className="admin-login">
       <div className="mdl-shadow--2dp admin-login-box">
         <h4>Login</h4>
         <form onSubmit={this.onSubmit.bind(this)}>
           <div className="mdl-textfield mdl-js-textfield">
             <input
               className="mdl-textfield__input myinput"
               type="text"
               placeholder="Enter email"
               value={this.state.email}
               onChange={(e)=>this.onChange(e)}
               id="email"
             />
           </div>
           <br />
           <div className="mdl-textfield mdl-js-textfield">
             <input
               className="mdl-textfield__input myinput"
               type="password"
               placeholder="Enter Password"
               value={this.state.password}
               onChange={(e)=>this.onChange(e)}
               id="password"
             />
           </div>
           <br />
           <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit" >
              Submit
           </button>
           <div id="demo-toast-example1" className="mdl-js-snackbar mdl-snackbar">
             <div className="mdl-snackbar__text" style={{fontSize:20}} /> 
             <button className="mdl-snackbar__action" type="button" />
           </div>
         </form>
       </div>
     </div>
   );
 }
}

export default withRouter(AdminLogin);
