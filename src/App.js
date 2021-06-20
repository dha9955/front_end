import React, {useEffect} from "react";
import './App.css';
import { Route, Switch } from "react-router-dom";
import Signin from "./containers/Signin";
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import {isUserLoggedIn, getContacts} from './actions'


function App() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(user.authenticate) {
      dispatch(getContacts());
    }
  }, [ user.authenticate , dispatch ])

  return (
    <div className="App">
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Switch>
    </div>
  );
}

export default App;
