import React, {Component} from 'react';
import CustomerRegistrationForm   from './components/customer/CustomerRegistrationForm';
import {Route,Switch} from 'react-router-dom';
import DashBoardLayout from './layouts/DashBoardLayout';
import  Customer  from './components/customer/Customer';
import Jobsheet from './components/jobsheet';
import  CreateJobSheet  from './components/jobsheet/CreateJobSheet';
import  JobSheetForm  from './components/jobsheet/JobSheetForm';
import  Track  from './components/track';
export class App extends Component {
  render () {
    return (
      <DashBoardLayout>
        {(search)=>{
          return(
            <Switch>
              <Route exact path='/' render={(props)=><Track {...props} search={search} />} />
              <Route exact path='/customer' render={(props)=><Customer {...props} search={search} />} />
              <Route exact path='/customerform' render={(props)=><CustomerRegistrationForm {...props} search={search} />} />
              <Route exact path='/customeredit/:id' render={(props)=><CustomerRegistrationForm {...props} search={search} />} />
              <Route exact path='/jobsheet/' render={(props)=><Jobsheet {...props} search={search} />} />
              <Route exact path='/createjobsheet' render={(props)=><CreateJobSheet {...props} search={search} />} />
              <Route exact path='/jobsheetform/:jobSheetId/:customerId/:customerName/:customerNumber/:customerEmail/:customerAddress/:hpd/:vehicleModel/:vehicleColor/:vehicleKeyNumber/:vehicleEngineNumber/:vehicleChassisNumber/:vehicleSoldDealer/:type/:mycheck' component={JobSheetForm}/>
              <Route component={NoMatch} />
            </Switch>
          )}}
      </DashBoardLayout>
    );
  }
}

export default App;

const NoMatch = ({ location }) => (
  <div>
    <h6>
      No match for <code>{location.pathname}</code>
    </h6>
  </div>
);