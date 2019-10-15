import React, { Component } from "react";
import cuid from "cuid";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Button, Spin } from "antd";
import queryString from "query-string";
import config from "./../../config";
import { getQrCode, onRefreshToken, saveTokens } from "../../actions/userAction";
import Echo from "laravel-echo";

// window.Echo = new Echo({
//   broadcaster: "pusher",
//   key: "ef9bcd4ecd1038dd7de2",
//   cluster: "ap2",
//   forceTLS: true
// });
// var channel = Echo.channel('uniqueCode.5d9b34975838a');
// channel.listen("UniqueCodeDecode", e => {
//   alert("sa");
//   console.log(e);
// });
const options = {
  broadcaster: "pusher",
  key: "ef9bcd4ecd1038dd7de2",
  cluster: "ap2",
  forceTLS: true
};
const echo = new Echo(options);
// var channel = echo.channel('my-channel');
// channel.listen('.my-event', function(data) {
//   alert(JSON.stringify(data));
// });

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { qrImg: "", loading: false };
  }
  componentDidMount() {
    this.loadQrCode();
  }

  onClickLogin = () => {
    const state = cuid();
    const configAuth = {
      client_id: config.auth.AUTH_CLIENT_ID,
      redirect_uri: config.auth.REDIRECT_URI,
      response_type: "code",
      state: state
    };
    localStorage.setItem("state_cuid", state);
    let query = queryString.stringify(configAuth, { sort: false, encode: false });
    let AuthRedirect = `${config.BASE_URL}/oauth/authorize?${query}`;
    window.location.href = AuthRedirect;
  };

  loadQrCode = () => {
    this.setState({ loading: true });
    this.props
      .getQrCode()
      .then(res => {
        console.log("in", res);
        this.setState({
          qrImg: res.qr_code
        });
        this.setState({ loading: false });
        // Echo.private(`unique-code.5d9b34975838a`).listen("UniqueCodeDecode", e => {
        //   alert("sa");
        //   console.log(e);
        // });
        var channel2 = echo.channel(`uniqueCode.${res.channel_id}`);
        channel2.listen(".UniqueCodeDecode", e => {
          //alert("sa");
          console.log(e.uniqueCode.token.accessToken);
          saveTokens(e.uniqueCode.token);
          setTimeout(() => {
            window.location.href = process.env.PUBLIC_URL;
          }, 1000);
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  leaveAllChannel() {
    echo.channel("uniqueCode.*").stopListening("UniqueCodeDecode");
    echo.leaveChannel("uniqueCode.*");
  }

  render() {
    return (
      <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
        <Row type="flex" justify="space-around">
          <Col span={12}>
            <div className="signup-container">
              <div className="signup-content">
                <h1 className="signup-title">Auth Option</h1>
                <div className="social-signup" onClick={this.onClickLogin}>
                  <img src={"assets/lara_auth.png"} alt="Facebook" />
                  <span>Login With Laravel Passport </span>
                </div>
                <div className="or-separator">
                  <span className="or-text">OR</span>
                </div>
                <Button type="primary" onClick={this.loadQrCode}>
                  Get Code
                </Button>
                {/* <Button type="primary" onClick={this.leaveAllChannel}>
                  leave All channel
                </Button> */}
                <br></br>
                <br></br>
                <Spin tip="Loading..." spinning={this.state.loading}>
                  {this.state.qrImg && (
                    <div className="qr-code">
                      <img alt="qr-code" src={`data:image/jpeg;base64,${this.state.qrImg}`} />
                    </div>
                  )}
                </Spin>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

Home.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getQrCode: ev => dispatch(getQrCode()),
    loadToken: token => dispatch(onRefreshToken(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
