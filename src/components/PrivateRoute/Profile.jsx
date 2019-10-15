import React, { Component } from "react";
import { Avatar, Tabs, List, Button } from "antd";
import { connect } from "react-redux";
import { getAvatarColor, formatDate } from "../../utils/helper";
import { getUserList } from "../../actions/userAction";

const tabBarStyle = {
  textAlign: "center"
};
const TabPane = Tabs.TabPane;
const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires."
];
class Profile extends Component {
  componentDidMount() {
    this.props.getUserList();
  }
  render() {
    return (
      <div className="user-profile">
        <div className="user-details">
          <div className="user-avatar">
            {this.props.user.full_name && (
              <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(this.props.user.full_name) }}>
                {this.props.user.full_name[0].toUpperCase()}
              </Avatar>
            )}
          </div>
          <div className="user-summary">
            <div className="full-name">{this.props.user.full_name}</div>
            <div className="username">@{this.props.user.email}</div>
            <div className="user-joined">Joined {formatDate(this.props.user.created_at)}</div>
          </div>
        </div>
        <div className="user-poll-details">
          <Tabs defaultActiveKey="1" animated={false} tabBarStyle={tabBarStyle} size="large" className="profile-tabs">
            <TabPane tab={`Demo 1`} key="1">
              <Button type="primary" onClick={() => this.props.getUserList()}>
                Click me!
              </Button>
              <h3 style={{ margin: "16px 0" }}>User List</h3>
              <List
                size="small"
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={this.props.userList}
                renderItem={item => (
                  <List.Item>
                    {item.name} - {item.email}
                  </List.Item>
                )}
              />
            </TabPane>
            <TabPane tab={`Demo 2`} key="2">
              <h3 style={{ margin: "16px 0" }}>Product List</h3>
              <List
                size="small"
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={data}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.userInfo,
  userList: state.user.userList || []
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserList: event => dispatch(getUserList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
