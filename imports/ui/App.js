import React, {Component} from 'react';
import CustomerRegistrationForm   from './components/customer/CustomerRegistrationForm';
import {Route,Switch} from 'react-router-dom';
import DashBoardLayout from './layouts/DashBoardLayout';
import  Customer  from './components/customer/Customer';
import jobsheet from './components/jobsheet';
import  CreateJobSheet  from './components/jobsheet/CreateJobSheet';
import  JobSheetForm  from './components/jobsheet/JobSheetForm';

export class App extends Component {
  render () {
    return (
      <DashBoardLayout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/customer' component={Customer}/>
          <Route exact path='/customerform' component={CustomerRegistrationForm}/>
          <Route exact path='/customeredit/:id' component={CustomerRegistrationForm}/>
          <Route exact path='/jobsheet/' component={jobsheet}/>
          <Route exact path='/createjobsheet' component={CreateJobSheet}/>
          <Route exact path='/jobsheetform/:jobSheetId/:customerId/:customerName/:customerNumber/:customerEmail/:customerAddress/:hpd/:vehicleModel/:vehicleColor/:vehicleKeyNumber/:vehicleEngineNumber/:vehicleChassisNumber/:vehicleSoldDealer/:type' component={JobSheetForm}/>
          <Route component={NoMatch} />
        </Switch>
      </DashBoardLayout>
    );
  }
}

export default App;

const Home = ()=> <h1>Home</h1>
const NoMatch = ({ location }) => (
  <div>
    <h6>
      No match for <code>{location.pathname}</code>
    </h6>
  </div>
);