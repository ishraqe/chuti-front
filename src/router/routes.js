import React from "react";
import { Switch, Route } from "react-router-dom";
import App from '../App';
import District from '../containers/district/District';


const routes = () => {
    return (
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/district" component={District} />
      </Switch>
    );
  };
  
  export default routes;