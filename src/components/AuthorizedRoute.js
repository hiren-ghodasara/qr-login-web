import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from "../AuthContext/AuthProvider";

const AuthorizedRoute = ({ component, ...rest }) => {
  return (
    <AuthConsumer>
      {({ currentAuth }) => <>{currentAuth.logged ? <Route component={component} {...rest} /> : <Redirect push to="/" />}</>}
    </AuthConsumer>
  );
};

export default AuthorizedRoute;
