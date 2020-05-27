import React from "react";
import {
  Route,
  Redirect
} from "react-router-dom";

const AuthRoute = (props) => {
  const isAlreadySignin = localStorage.getItem('userId');

  return isAlreadySignin ? <Route {...props} /> : <Redirect to="/" />;
};



export default AuthRoute;