import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import queryString from "query-string";
//
import * as userActions from "./../../../actions/userAction";

class Callback extends Component {
  componentDidMount = () => {
    const parsed = queryString.parse(this.props.location.search);
    if (parsed && parsed.code && parsed.state) {
      const stateCookie = localStorage.getItem("state_cuid");
      if (stateCookie === parsed.state) {
        this.props
          .getAccessToken(parsed.code)
          .then(res => {
            window.location.href = "/";
          })
          .catch(err => {
            this.props.history.push({
              pathname: "/",
              state: {
                from: this.props.location,
                error: "Invalid callback URL."
              }
            });
          });
      } else {
        this.props.history.push({
          pathname: "/",
          state: {
            from: this.props.location,
            error: "Invalid Session"
          }
        });
      }
    } else {
      this.props.history.push({
        pathname: "/",
        state: {
          from: this.props.location,
          error: "Invalid callback URL."
        }
      });
    }
  };
  render() {
    return <h1>Loading...</h1>;
  }
}

Callback.propTypes = {
  getAccessToken: PropTypes.func.isRequired,
  getUserProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  todos: {}
});

export default connect(
  mapStateToProps,
  userActions
)(Callback);
