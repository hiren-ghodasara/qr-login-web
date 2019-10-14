import React, { Suspense, lazy } from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import Pusher from "pusher-js";
import PropTypes from "prop-types";
import { Route, Switch, Redirect, HashRouter } from "react-router-dom";
import "./App.scss";
import SiteHeader from "./components/layout/Header";
import SiteFooter from "./components/layout/Footer";
import PageNotFound from "./components/PageNotFound";
import { setUpInit } from "./utils/axios-config";
import { userLogout } from "./actions/userAction";

Pusher.logToConsole = process.env.NODE_ENV === "production" ? false : true;

setUpInit();
const Home = lazy(() => import("./components/home/Home"));
const Profile = lazy(() => import("./components/PrivateRoute/Profile"));
const { Content } = Layout;

const App = props => {
  return (
    <HashRouter basename={`/`}>
      {/* <Router basename={`${process.env.PUBLIC_URL}`}> */}
        <div className="">
          <SiteHeader {...props} />
          <Suspense fallback={<div>Loading fallback...</div>}>
            <Layout>
              <Content className="main-content" style={{ marginTop: 64 }}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={pr =>
                      props.user.isAuthenticated ? (
                        <Redirect
                          to={{
                            pathname: "/profile"
                          }}
                        />
                      ) : (
                        <Home />
                      )
                    }
                  />
                  <Route path={"/profile"} component={Profile} />
                  {/* <Route path={'/login'} component={Login}/> */}
                  <Route component={PageNotFound} />
                </Switch>
              </Content>
            </Layout>
          </Suspense>
          <SiteFooter />
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogoutClick: event => dispatch(userLogout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// export default App;
