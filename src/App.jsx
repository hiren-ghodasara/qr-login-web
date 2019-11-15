import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import Pusher from "pusher-js";
import PropTypes from "prop-types";
import { Route, Switch, HashRouter } from "react-router-dom";
import "./App.scss";
import { setUpInit } from "./utils/axios-config";
import { userLogout, toggleAuthModel } from "./actions/userAction";
import SiteHeader from "./components/layout/Header";
import SiteFooter from "./components/layout/Footer";
import LoginModel from "./components/auth/LoginModel";
import ProtectedRoute from "./components/auth/ProtectedRoute";

Pusher.logToConsole = process.env.NODE_ENV === "production" ? false : true;

setUpInit();

const LandingPage = lazy(() => import("./components/LandingPage"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const Account = lazy(() => import("./components/PrivateRoute/Account/Account"));
const ContestInformationPage = lazy(() => import("./components/ContestInformationPage"));
const TestColor = lazy(() => import("./components/Test"));

const App = (props) => {
  return (
    <HashRouter basename={`${process.env.PUBLIC_URL}`}>
      {/* <Router basename={`${process.env.PUBLIC_URL}`}> */}
      <div className="">
        <SiteHeader {...props} />
        <Suspense fallback={<div>Loading fallback...</div>}>
          <main role="main">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <ProtectedRoute path={"/account"} component={Account} />
              <Route path={"/test-color"} component={TestColor} />
              <Route path={"/contest-information/:id"} component={ContestInformationPage} />
              <Route component={PageNotFound} />
            </Switch>
          </main>
        </Suspense>
        <SiteFooter />
        {props.user.authModel && <LoginModel />}
      </div>
      {/* </Router> */}
    </HashRouter>
  );
};

App.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

const mapDispatchToProps = {
  userLogout,
  toggleAuthModel,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
