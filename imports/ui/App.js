import React, {Component} from 'react';
import CustomerRegistrationForm   from './components/customer/CustomerRegistrationForm';
import {Route,Switch} from 'react-router-dom';
import DashBoardLayout from './layouts/DashBoardLayout';
import  Customer  from './components/customer/Customer';
import Jobsheet from './components/jobsheet';
import  CreateJobSheet  from './components/jobsheet/CreateJobSheet';
import  JobSheetForm  from './components/jobsheet/JobSheetForm';
import  Track  from './components/track';
import  ViewJobSheet  from './components/jobsheet/ViewJobSheet';
import Login from './components/Login/Login';
import Authentication from './components/Login/Authentication';


const MyRoute = (props)=>{
  return(
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/customer' component={App} />
      <Route exact path='/customerform' component={App} />
      <Route exact path='/customeredit/:id' component={App} />
      <Route exact path='/jobsheet/' component={App} />
      <Route exact path='/createjobsheet' component={App} />
      <Route exact path='/newjobsheet/:jobSheetId/:customerId/:type' component={App}/>
      <Route exact path='/viewjobsheet/:jobSheetId' component={App} />
      <Route exact path='/login' component={Login} />
      <Route component={NoMatch} />
    </Switch>
  )
}

export class App extends Component {
  render () {
    return (
      <DashBoardLayout>
        {(search,changeTitle)=>{
          return(
            <Switch>
              <Authentication>
                <Route exact path='/' render={(props)=><Track {...props} search={search} changeTitle={changeTitle} />} />
                <Route exact path='/customer' render={(props)=><Customer {...props} search={search} changeTitle={changeTitle} />} />
                <Route exact path='/customerform' render={(props)=><CustomerRegistrationForm {...props} search={search} changeTitle={changeTitle} />} />
                <Route exact path='/customeredit/:id' render={(props)=><CustomerRegistrationForm {...props} search={search} changeTitle={changeTitle} />} />
                <Route exact path='/jobsheet/' render={(props)=><Jobsheet {...props} search={search} changeTitle={changeTitle} />} />
                <Route exact path='/createjobsheet' render={(props)=><CreateJobSheet {...props} search={search} changeTitle={changeTitle} />} />
                <Route exact path='/newjobsheet/:jobSheetId/:customerId/:type' render={(props)=><JobSheetForm {...props} search={search} changeTitle={changeTitle} />}/>
                <Route exact path='/viewjobsheet/:jobSheetId' render={(props)=><ViewJobSheet {...props} search={search} changeTitle={changeTitle} />} />
                <Route component={NoMatch} />
              </Authentication>
            </Switch>
          )}}
      </DashBoardLayout>
    );
  }
}

export default MyRoute;

const NoMatch = ({ location }) => (
  <div>
    <h6>
      No match for <code>{location.pathname}</code>
    </h6>
  </div>
);