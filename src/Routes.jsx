import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import OnShow from './views/OnShow';
import Shows from './views/Shows';
import ShowDetail from './components/Show/ShowDetail'

const Routes = () => {
    return (
        <Switch>
        <Route exact path="/">
          <Home />
         </Route>
         <Route  path="/onshow">
        <OnShow />
      </Route>
      <Route  path="/shows">
        <Shows />
      </Route>
      <Route path='/show/:id' component={ShowDetail} />
        
        </Switch>
    )
}

export default Routes
