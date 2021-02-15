import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import OnShow from './views/OnShow';
import Shows from './views/Shows';



const Routes = () => {
    return (
        <Switch>
        <Route exact path="/">
          <Home />
         </Route>
         <Route exact path="/onshow">
        <OnShow />
      </Route>
      <Route exact path="/shows">
        <Shows />
      </Route>
        
        </Switch>
    )
}

export default Routes
