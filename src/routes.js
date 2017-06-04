import React from 'react';
import { Router, Route, IndexRoute } from 'react-router'

import * as Container from './components/index';

export default (
  <Router>
    <Route path="/" component={Container.App}>
      <IndexRoute component={Container.HomePage}/>
    </Route>

    <Route component={Container.requireGuest(Container.App)}>
      {/*<Route path="/signup">
       <IndexRoute component={Container.Form1} />
       <Route path="confirm" component={Container.ConfirmPage} />
       </Route>*/}
      <Route path="/login" component={Container.LoginPage}/>
    </Route>

    <Route path="/account" component={Container.requireAuth(Container.App)}>
      <IndexRoute component={Container.AccountPage}/>
    </Route>


    <Route path="*" component={Container.NotFound}/>
  </Router>
)