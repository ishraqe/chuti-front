import React, {Component} from "react";
import { Switch, Route } from "react-router-dom";
import firebase from 'firebase';
import App from '../App';
import District from '../containers/district/District';


class routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/district" component={District} />
      </Switch>
    )
  }
};
  
export default routes;