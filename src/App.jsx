import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import Pusher from "pusher-js";
import PropTypes from "prop-types";
import { Route, Switch, HashRouter } from "react-router-dom";
import "./App.scss";
import SiteHeader from "./components/layout/Header";
import SiteFooter from "./components/layout/Footer";
import PageNotFound from "./components/PageNotFound";
import { setUpInit } from "./utils/axios-config";
import { userLogout, toggleAuthModel } from "./actions/userAction";
import TestColor from "./components/Test";
import LandingPage from "./components/LandingPage";
import LoginModel from "./components/auth/LoginModel";
import AuthorizedRoute from "./components/AuthorizedRoute";
import { AuthProvider } from "./AuthContext/AuthProvider";

Pusher.logToConsole = process.env.NODE_ENV === "production" ? false : true;

setUpInit();
//const Home = lazy(() => import("./components/home/Home"));
const Account = lazy(() => import("./components/PrivateRoute/Account"));

const App = props => {
  return (
    <HashRouter basename={`${process.env.PUBLIC_URL}`}>
      {/* <Router basename={`${process.env.PUBLIC_URL}`}> */}
      <div className="">
        <AuthProvider {...props}>
          <SiteHeader {...props} />
          <Suspense fallback={<div>Loading fallback...</div>}>
            <main role="main">
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <AuthorizedRoute path={"/account"} component={Account} />
                <Route path={"/test-color"} component={TestColor} />
                {/* <Route path={'/login'} component={Login}/> */}
                <Route component={PageNotFound} />
              </Switch>
            </main>
          </Suspense>
          <SiteFooter />
          {props.user.authModel && <LoginModel />}
        </AuthProvider>
      </div>
      {/* </Router> */}
    </HashRouter>
  );
};

App.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  userLogout,
  toggleAuthModel
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// export default App;
