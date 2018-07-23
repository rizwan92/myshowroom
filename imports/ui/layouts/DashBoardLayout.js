/*jshint esversion: 6 */
/*global  componentHandler:true */
import React, { Component } from 'react';
import { NavLink,withRouter } from 'react-router-dom';
export class HomePage extends Component {

  state ={
    search:''
  }

  componentDidMount() {
    componentHandler.upgradeDom();
  }
  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  render() {    
    return (
      <div>
        <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
          <header className="demo-header mdl-layout__header  mdl-color-text--white">
            <div className="mdl-layout__header-row">
              <span
                className="mdl-layout-title"
                onClick={() => this.props.history.push('/')}
                style={{ cursor: 'pointer' }}
              >
                Star Auto
              </span>

              <div className="mdl-layout-spacer" />
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                  mdl-textfield--floating-label mdl-textfield--align-right">
                <label className="mdl-button mdl-js-button mdl-button--icon"
                  htmlFor="fixed-header-drawer-exp">
                  <i className="material-icons">search</i>
                </label>
                <div className="mdl-textfield__expandable-holder">
                  <input className="mdl-textfield__input" style={{borderColor:'white'}} type="text" name="sample"
                    onChange={(e)=>this.setState({search:e.target.value})} id="fixed-header-drawer-exp" />
                </div>
              </div>
            </div>
          </header>
          <div className="demo-drawer mdl-layout__drawer ">

            <header className="demo-drawer-header">
              <img src="http://www.websoftcompany.com/image/user.png" className="demo-avatar" />
              <span>hello@example.com</span>
              <span className="mdl-layout-title">Star Auto</span>
              <div className="mdl-layout-spacer"></div>
            </header>
            <hr />
            <nav
              className={'demo-navigation mdl-navigation mdl-color--black-grey-800'}>
              <NavLink className="mdl-navigation__link" to="/" style={{fontSize:13}} >
                <i className="mdl-color-text--blue-grey-400 material-icons" style={{fontSize:23}} role="presentation">home</i>
                 Home
              </NavLink>
              <NavLink className="mdl-navigation__link" to="/customerform" style={{fontSize:13}} >
                <i className="mdl-color-text--blue-grey-400 material-icons" style={{fontSize:23}} role="presentation">person_add</i>
                Add Customers
              </NavLink>
              <NavLink className="mdl-navigation__link" to="/customer" style={{fontSize:13}} >
                <i className="mdl-color-text--blue-grey-400 material-icons" style={{fontSize:23}} role="presentation">person</i>
                Customer Details
              </NavLink>
              <NavLink className="mdl-navigation__link" to="/createjobsheet" style={{fontSize:13}}>
                <i className="mdl-color-text--blue-grey-400 material-icons" style={{fontSize:23}} role="presentation">add_to_photos</i>
               Add Jobsheets
              </NavLink>
              <NavLink className="mdl-navigation__link" to="/jobsheet" style={{fontSize:13}}>
                <i className="mdl-color-text--blue-grey-400 material-icons" style={{fontSize:23}} role="presentation">description</i>
                Jobsheet Details
              </NavLink>
              <div className="mdl-layout-spacer" />
              <NavLink
                className="mdl-navigation__link"
                to={process.env.PUBLIC_URL + ''}
              >
                <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation"> help_outline</i>
                <span className="visuallyhidden">Help</span>
              </NavLink>
            </nav>
          </div>
          <main className="mdl-layout__content" style={{ padding: 20 }}>
            {this.props.children(this.state.search)}
          </main>
        </div>


        <div id="demo-toast-example" className="mdl-js-snackbar mdl-snackbar">
          <div className="mdl-snackbar__text" style={{fontSize:20}} /> 
          <button className="mdl-snackbar__action" type="button" />
        </div>
        <iframe
          title="print"
          id="myiframe"
          style={{ position: 'absolute', top: '-100vh' }}
        />
      </div>
    );
  }
}

export default withRouter(HomePage);