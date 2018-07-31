import { Session } from 'meteor/session';
import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'

export class Authentication extends Component {
    state ={
      myshowroom:null
    }
    componentDidMount = () => {
      const myshowroom = JSON.parse(localStorage.getItem('myshowroom'))
      if (myshowroom) {
        this.setState({myshowroom})
      }else{
        this.props.history.push('/login')
      }      
    }
    render() {
      if(this.state.myshowroom){        
        return this.props.children(this.state.myshowroom)
      }else{
        return (
          <div>
            <div className="mdl-spinner mdl-js-spinner is-active myloader"></div>
          </div>
        )
      }
    }
}



export default withRouter(Authentication)



