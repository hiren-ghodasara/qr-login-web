import React, { Component } from "react";
import { Menu, Dropdown, Icon } from "antd";
import { connect } from "react-redux";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import { getUserProfile } from "../../../actions/userAction";
import config from "../../../config";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import ApiToken from "./ApiToken";
import Transaction from "./Transaction";
import PaymentMethod from "./PaymentMethod";

const generalMenu = (
  <Menu>
    <Menu.Item>
      <Link className="dropdown-item" to={`/account/dashboard`}>
        Dashboard
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link className="dropdown-item" to={`/account/profile`}>
        Profile
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link className="dropdown-item" to={`/account/profile`}>
        My tasks
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link className="dropdown-item" to={`/account/profile`}>
        Projects
      </Link>
    </Menu.Item>
  </Menu>
);

const billingMenu = (
  <Menu>
    <Menu.Item>
      <Link className="dropdown-item" to={`/account/transactions`}>
        Transactions
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link className="dropdown-item" to={`/account/payment-method`}>
        Payment methods
      </Link>
    </Menu.Item>
  </Menu>
);

const accessibilityMenu = (
  <Menu>
    <Menu.Item>
      <Link className="dropdown-item" to={`/account/dashboard`}>
        Invite friends
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link className="dropdown-item" to={`/account/api-token`}>
        API Token
      </Link>
    </Menu.Item>
  </Menu>
);

class Account extends Component {
  componentDidMount() {
    this.props.getUserProfile();
  }
  render() {
    const { user, match } = this.props;
    return (
      <>
        <div className="bg-primary">
          <div className="container py-3">
            <div className="row">
              <div className="col-lg-7">
                <div className="media d-block d-sm-flex align-items-sm-center">
                  <div className="u-lg-avatar position-relative mb-3 mb-sm-0 mr-3">
                    <img
                      className="img-fluid rounded-circle"
                      src={`${config.BASE_URL}/storage/${user.userInfo.avatar_location}`}
                      alt={user.userInfo.avatar_location}
                    />
                  </div>
                  <div className="media-body">
                    <h1 className="h3 text-white font-weight-medium mb-1">Howdy, {user.userInfo.full_name}</h1>
                    <span className="d-block text-white">{user.userInfo.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="d-lg-flex justify-content-lg-between align-items-lg-center">
              <div className="container">
                <nav className="navbar navbar-expand-md navbar-light bg-primary pb-0">
                  <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                      <li className="nav-item px-1">
                        <Dropdown overlay={generalMenu}>
                          <Link className="nav-link text-white" to={`#`}>
                            General <Icon type="down" />
                          </Link>
                        </Dropdown>
                      </li>
                      <li className="nav-item px-1">
                        <Dropdown overlay={billingMenu}>
                          <Link className="nav-link text-white" to={`#`}>
                            Billing <Icon type="down" />
                          </Link>
                        </Dropdown>
                      </li>
                      <li className="nav-item px-1">
                        <Dropdown overlay={accessibilityMenu}>
                          <Link className="nav-link text-white" to={`#`}>
                            Accessibility <Icon type="down" />
                          </Link>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-light">
          <Switch>
            <Route path={`${match.path}/dashboard`} render={(props) => <Dashboard {...props}  authUser={user}/>} />
            <Route path={`${match.path}/profile`} component={() => <Profile isAuthed={true} />} />
            <Route path={`${match.path}/api-token`} component={ApiToken} />
            <Route path={`${match.path}/transactions`} component={Transaction} />
            <Route path={`${match.path}/payment-method`} component={PaymentMethod} />
            <Redirect to={`${match.path}/dashboard`} />
          </Switch>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

const mapDispatchToProps = {
  getUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
