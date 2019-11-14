import React, { Component } from "react";
import cuid from "cuid";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Spin, Modal, Button, Tabs, notification } from "antd";
import queryString from "query-string";
import config from "./../../config";
import { getQrCode, saveTokens, toggleAuthModel, getUserProfile, userLogin, userSignup } from "../../actions/userAction";
import Echo from "laravel-echo";
import { setUpInit } from "../../utils/axios-config";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { errorFormater } from "../../utils/helper";
const { TabPane } = Tabs;

const options = {
  broadcaster: "pusher",
  key: "ef9bcd4ecd1038dd7de2",
  cluster: "ap2",
  forceTLS: true,
};
const echo = new Echo(options);

class LoginModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrImg: "",
      loading: false,
      viewScreen: 1,
      loginLoading: false,
      fields: {
        username: {
          value: "benjycui",
        },
        email: {
          value: "name@123.com",
        },
      },
    };
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
      state: state,
    };
    localStorage.setItem("state_cuid", state);
    let query = queryString.stringify(configAuth, {
      sort: false,
      encode: false,
    });
    let AuthRedirect = `${config.BASE_URL}/oauth/authorize?${query}`;
    window.location.href = AuthRedirect;
  };
  loadQrCode = () => {
    this.setState({ loading: true });
    this.props
      .getQrCode()
      .then((res) => {
        this.setState({
          qrImg: res.qr_code,
        });
        this.setState({ loading: false });
        // Echo.private(`unique-code.5d9b34975838a`).listen("UniqueCodeDecode", e => {
        //   alert("sa");
        //   console.log(e);
        // });
        var channel2 = echo.channel(`uniqueCode.${res.channel_id}`);
        channel2.listen(".UniqueCodeDecode", (e) => {
          //alert("sa");
          console.log(e.uniqueCode.token.accessToken);
          saveTokens(e.uniqueCode.token);
          setTimeout(() => {
            setUpInit();
            this.props.getUserProfile().then(() => {
              this.props.toggleAuthModel(false);
            });
            //window.location.href = process.env.PUBLIC_URL;
          }, 1000);
        });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };

  leaveAllChannel() {
    echo.channel("uniqueCode.*").stopListening("UniqueCodeDecode");
    echo.leaveChannel("uniqueCode.*");
  }

  handleOk = (e) => {
    console.log(e);
  };

  handleCancel = (e) => {
    console.log(e);
    this.props.toggleAuthModel(false);
  };

  chnageViewScreen = (type) => {
    console.log("type", type);
    this.setState({ viewScreen: type });
  };

  handleSignupSubmit = (values) => {
    console.log("Received values of Signup form: ", values);
    this.setState({ loginLoading: true });
    this.props
      .userSignup(values)
      .then((res) => {
        saveTokens(res);
        setTimeout(() => {
          setUpInit();
          this.props.getUserProfile().then((res) => {
            this.setState({ loginLoading: false });
            this.props.toggleAuthModel(false);
          });
        }, 1000);
      })
      .catch((error) => {
        this.setState({ loginLoading: false });
        if (error.response) {
          notification.error(errorFormater(error.response.data, 10));
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  handleLoginSubmit = (values) => {
    console.log("Received values of Login form: ", values);
    this.setState({ loginLoading: true });
    this.props
      .userLogin(values)
      .then((res) => {
        saveTokens(res);
        setTimeout(() => {
          setUpInit();
          this.props.getUserProfile().then((res) => {
            this.setState({ loginLoading: false });
            this.props.toggleAuthModel(false);
          });
        }, 1000);
      })
      .catch((error) => {
        this.setState({ loginLoading: false });
        if (error.response) {
          notification.error(errorFormater(error.response.data, 10));
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  render() {
    return (
      <Modal width={600} footer={false} visible={true} onOk={this.handleOk} onCancel={this.handleCancel} className="site-model">
        <div className="container">
          {this.state.viewScreen === 1 && (
            <div className="row">
              <div className="col-sm text-center">
                <h6 className="signup-title">Login Option</h6>
                <button onClick={this.onClickLogin} type="button" className="btn btn-outline-primary">
                  Login With Laravel Passport
                </button>
                <div className="my-2 dropdown-divider"></div>
                <div className="qr-code-area d-flex justify-content-center align-items-center">
                  <Spin tip="Loading..." spinning={this.state.loading}>
                    {this.state.qrImg && (
                      <div className="qr-code">
                        <img alt="qr-code" src={`data:image/jpeg;base64,${this.state.qrImg}`} />
                      </div>
                    )}
                  </Spin>
                </div>
                <button type="button" className="btn btn-primary mt-2" onClick={this.loadQrCode}>
                  Generate New
                </button>
                <div className="mt-3">
                  <Button onClick={() => this.chnageViewScreen(2)} type="link">
                    Login/Signup with mobile number and password
                  </Button>
                </div>
              </div>
            </div>
          )}
          {this.state.viewScreen === 2 && (
            <div className="row">
              <div className="col-sm text-center">
                <Spin spinning={this.state.loginLoading}>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Sign In" key="1" className="d-flex justify-content-center">
                      <div className="col-9 text-left">
                        <LoginForm onSubmit={this.handleLoginSubmit} />
                      </div>
                    </TabPane>
                    <TabPane tab="Sign Up" key="2" className="d-flex justify-content-center">
                      <div className="col-9 text-left">
                        <SignUpForm onSubmit={this.handleSignupSubmit} />
                      </div>
                    </TabPane>
                  </Tabs>
                </Spin>
                <div className="mt-0">
                  <Button onClick={() => this.chnageViewScreen(1)} type="link">
                    Use QR Code to Login
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    );
  }
}

LoginModel.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  getQrCode,
  toggleAuthModel,
  userLogin,
  userSignup,
  getUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModel);
