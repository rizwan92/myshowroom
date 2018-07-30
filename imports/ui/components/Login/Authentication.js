import { Session } from 'meteor/session';
import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'

export class Authentication extends Component {
    state ={
      myshowroom:null
    }
    componentDidMount = () => {
      const myshowroom = Session.get('myshowroom')
      if (myshowroom === undefined || 'undefined') {
        this.props.history.push('/login')
      }else{
        this.setState({myshowroom})
      }      
    }
    
    render() {
      if (this.state.myshowroom === null || undefined || 'undefined' ) {
        return <h2>Loading...</h2>
      }
      return this.props.children
    }
}



export default withRouter(Authentication)



