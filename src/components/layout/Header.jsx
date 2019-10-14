import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingBar from 'react-redux-loading-bar'
import { Layout, Menu, Dropdown, Icon } from "antd";
const Header = Layout.Header;

class SiteHeader extends Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick({ key }) {
    if (key === "logout") {
      this.props.onLogoutClick().then(res => {
        window.location.href = process.env.PUBLIC_URL;
      });
    }
  }

  render() {
    let menuItems;
    if (this.props.user.isAuthenticated) {
      menuItems = [
        <Menu.Item key="/profile" className="profile-menu">
          <ProfileDropdownMenu currentUser={this.props.user.userInfo} handleMenuClick={this.handleMenuClick} />
        </Menu.Item>
      ];
    }
    return (
      <Header className="app-header">
         {/* <LoadingBar scope="sectionBar" style={{ backgroundColor: 'blue', height: '5px' }} /> */}
         <LoadingBar />
        <div className="container">
          <div className="app-title">
            <Link to="/">Laravel Auth With QR Code</Link>
          </div>
          <Menu className="app-menu" mode="horizontal" selectedKeys={[this.props.location.pathname]} style={{ lineHeight: "64px" }}>
            {menuItems}
          </Menu>
        </div>
      </Header>
    );
  }
}

function ProfileDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
      <Menu.Item key="user-info" className="dropdown-item" disabled>
        <div className="user-full-name-info">{props.currentUser.name}</div>
        <div className="username-info">@{props.currentUser.name}</div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="profile" className="dropdown-item">
        <Link to={`/profile`}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" className="dropdown-item">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={dropdownMenu} trigger={["click"]} getPopupContainer={() => document.getElementsByClassName("profile-menu")[0]}>
      <a href="#foo" className="ant-dropdown-link">
        <Icon type="user" className="nav-icon" style={{ marginRight: 0 }} /> <Icon type="down" />
      </a>
    </Dropdown>
  );
}

//export default withRouter(SiteHeader);
SiteHeader.propTypes = {
  user: PropTypes.object
};

export default withRouter(SiteHeader);
