/*jshint esversion: 6 */
/*global  componentHandler:true */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
export class HomePage extends Component {

  state ={
    search:'',
    title:'Home',
  }

  componentDidMount() {
    componentHandler.upgradeDom();    
  }
  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  changeTitle =(title)=>this.setState({title})

  navigate(navigate,title){
    this.changeTitle(title)
    this.props.history.push(navigate)
    var layout = document.querySelector('.mdl-layout');
    var obfuscator = document.querySelector('.mdl-layout__obfuscator');
    if (obfuscator.classList.contains('is-visible')) {
      layout.MaterialLayout.toggleDrawer();
    }
  }

  logout=()=>{
    localStorage.removeItem('myshowroom')
    this.props.history.push('/login')
  }

  render() {       
    return (
      <div>
        <div className="demo-layout mdl-layout  mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header" 
        >
          <header className="demo-header mdl-layout__header mdl  mdl-color-text--white"  >
            <div className="mdl-layout__header-row">
              <span
                className="mdl-layout-title"
                onClick={() => this.props.history.push('/')}
                style={{ cursor: 'pointer' }}
              >
                {this.state.title}
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
          <div className="demo-drawer mdl-layout__drawer">

            <header className="demo-drawer-header">
              <img src="http://www.websoftcompany.com/image/user.png" className="demo-avatar" />
              <span>{this.props.credentials.showroomEmail}</span>
              <span className="mdl-layout-title">{this.props.credentials.showroomTitle}</span>
              <div className="mdl-layout-spacer"></div>
            </header>
            <hr />
            <nav
              className={'demo-navigation mdl-navigation mdl-color--black-grey-800'}>
              <a className="mdl-navigation__link" onClick={()=>this.navigate('/','Track')} style={{fontSize:13}} >
                <i className="mdl-color-text--blue-grey-400 material-icons" style={{fontSize:23}} role="presentation">adjust</i>
                 Track
              </a>
              <a className="mdl-navigation__link" onClick={()=>this.navigate('/customerform','Create Customer')} style={{fontSize:13}} >
                <i className="mdl-color-text--blue-grey-400 material-icons" style={{fontSize:23}} role="presentation">person_add</i>
                Add Customers
              </a>
              <a className="mdl-navigation__link"  onClick={()=>this.navigate('/customer','Customer Details')} style={{fontSize:13}} >
                <i className="mdl-color-text--blue-grey-400 material-icons" style={{fontSize:23}} role="presentation">person</i>
                Customer Details
              </a>
              <a className="mdl-navigation__link" onClick={()=>this.navigate('/createjobsheet','Create Jobsheet')}  style={{fontSize:13}}>
                <i className="mdl-color-text--blue-grey-400 material-icons" style={{fontSize:23}} role="presentation">add_to_photos</i>
               Add Jobsheets
              </a>
              <a className="mdl-navigation__link" onClick={()=>this.navigate('/jobsheet','Jobsheet Details')}  style={{fontSize:13}}>
                <i className="mdl-color-text--blue-grey-400 material-icons" style={{fontSize:23}} role="presentation">description</i>
                Jobsheet Details
              </a>
              <div className="mdl-layout-spacer" />
              <a
                className="mdl-navigation__link"
                onClick={()=>this.logout()}
              >
                <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">exit_to_app</i>
                <span>Logout</span>
              </a>
            </nav>
          </div>
          <main className="mdl-layout__content">
            {this.props.children(this.state.search,this.changeTitle)}
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
