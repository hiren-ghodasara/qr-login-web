import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingBar from "react-redux-loading-bar";
import { Menu, Dropdown, Icon } from "antd";
import { AuthConsumer } from "../../AuthContext/AuthProvider";

class SiteHeader extends Component {
  componentDidMount() {}

  handleMenuClick = ({ key }) => {
    if (key === "logout") {
      this.props.userLogout().then(res => {
        window.location.href = process.env.PUBLIC_URL;
      });
    }
  };

  authModelVisible = () => {
    //this.props.currentAuth.setLogged(true);
    this.props.toggleAuthModel(true);
  };

  render() {
    console.log(`this.props`, this.props);
    const logginUserMenu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="account">
          <Link to={`/account`}>My Account</Link>
        </Menu.Item>
        <Menu.Item key="logout">Logout</Menu.Item>
      </Menu>
    );
    return (
      <>
        <div style={{ position: "fixed", width: "100%", zIndex: "10" }}>
          <LoadingBar className="loading" />
        </div>
        <AuthConsumer>
          {({ currentAuth }) => (
            <>
              <header>
                <nav className="navbar navbar-expand-md navbar-light bg-white py-0">
                  <div className="container">
                    <Link to="/" className="navbar-brand" >
                      <img className="align-text-bottom" src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="Last" />
                      <span className="text-primary h1 font-weight-bold">Last</span>
                    </Link>
                    
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                      <ul className="navbar-nav ml-auto">
                        {/* <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" href="#foo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Home
                          </a>
                          <div className="dropdown-menu p-0 border-0 shadow m-0">
                            <a className="dropdown-item" href="index.html">
                              Landing Agency
                            </a>
                            <a className="dropdown-item" href="landing-business.html">
                              Landing Business
                            </a>
                          </div>
                        </li> */}

                        {/* <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" href="#foo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Pages
                          </a>
                          <div className="dropdown-menu p-0 border-0 shadow m-0">
                            <a className="dropdown-item" href="aboutus.html">
                              About Us
                            </a>
                            <a className="dropdown-item" href="services.html">
                              Services
                            </a>
                            <a className="dropdown-item" href="contact.html">
                              Contact
                            </a>
                          </div>
                        </li>  */}

                        <li className="nav-item dropdown">
                          {/* eslint-disable-next-line */}
                          {!currentAuth.logged && (
                            //eslint-disable-next-line
                            <a className="nav-link" href="#" onClick={this.authModelVisible}>
                              <i className="fas fa-sign-in-alt"></i> Login/Sinup
                            </a>
                          )}
                          {currentAuth.logged && (
                            <Dropdown overlay={logginUserMenu} trigger={["click"]}>
                              {/* eslint-disable-next-line */}
                              <a className="nav-link">
                                {this.props.user.userInfo.full_name} <Icon type="down" />
                              </a>
                            </Dropdown>
                          )}
                        </li>
                      </ul>
                      {/* <a href="#000" className="btn btn-primary btn-md ml-md-3 d-none d-md-inline-block">
                        Buy Now
                      </a> */}
                    </div>
                  </div>
                </nav>
              </header>
            </>
          )}
        </AuthConsumer>
      </>
    );
  }
}

//export default withRouter(SiteHeader);
SiteHeader.propTypes = {
  user: PropTypes.object
};

export default SiteHeader;
