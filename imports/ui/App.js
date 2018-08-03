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
import  Registration  from './components/Login/Registration';
import { spring,AnimatedSwitch } from 'react-router-transition';


const MyRoute = ()=>{
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
      <Route exact path='/createshowroom' component={Registration} />
      <Route component={NoMatch} />
    </Switch>
  )
}

export class App extends Component {
  render () {
    return (
      <Authentication>
        {
          (credentials)=>{            
            return(
              <DashBoardLayout credentials={credentials}>
                {(search,changeTitle)=>{
                  return(
                    <div>
                      <AnimatedSwitch
                        atEnter={bounceTransition.atEnter}
                        atLeave={bounceTransition.atLeave}
                        atActive={bounceTransition.atActive}
                        mapStyles={mapStyles}
                        className="switch-wrapper"
                      >
                        <Route exact path='/' render={(props)=><Track {...props} search={search} changeTitle={changeTitle} credentials={credentials} />} />
                        <Route exact path='/customer' render={(props)=><Customer {...props} search={search} changeTitle={changeTitle} credentials={credentials} />} />
                        <Route exact path='/customerform' render={(props)=><CustomerRegistrationForm {...props} search={search} changeTitle={changeTitle} credentials={credentials} />} />
                        <Route exact path='/customeredit/:id' render={(props)=><CustomerRegistrationForm {...props} search={search} changeTitle={changeTitle} credentials={credentials} />} />
                        <Route exact path='/jobsheet/' render={(props)=><Jobsheet {...props} search={search} changeTitle={changeTitle} credentials={credentials} />} />
                        <Route exact path='/createjobsheet' render={(props)=><CreateJobSheet {...props} search={search} changeTitle={changeTitle} credentials={credentials} />} />
                        <Route exact path='/newjobsheet/:jobSheetId/:customerId/:type' render={(props)=><JobSheetForm {...props} search={search} changeTitle={changeTitle} credentials={credentials} />}/>
                        <Route exact path='/viewjobsheet/:jobSheetId' render={(props)=><ViewJobSheet {...props} search={search} changeTitle={changeTitle} credentials={credentials} />} />
                      </AnimatedSwitch>
                    </div>
                  )}}
              </DashBoardLayout>
            )
          }
        }
      </Authentication>
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


function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};
