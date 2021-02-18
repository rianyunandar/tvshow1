import React from "react";
import { Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/protected-route";


import OnShow from "./views/OnShow";
import Shows from "./views/Shows";
import ShowDetail from "./components/Show/ShowDetail";
import Loading from './components/loading';

const Routes = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Switch>
      <Route exact path="/">
        <OnShow />
      </Route>
      <ProtectedRoute path="/shows/" component={Shows} />
      <ProtectedRoute path="/show/:id" component={ShowDetail} />
    </Switch>
  );
};

export default Routes;
