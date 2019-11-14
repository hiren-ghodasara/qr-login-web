import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Echo from "laravel-echo";
import { Spin, Modal, Tabs, notification } from "antd";
import { getQrCode, saveTokens, toggleAuthModel, getUserProfile, userLogin, userSignup } from "../../actions/userAction";
import { setUpInit } from "../../utils/axios-config";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { errorFormater } from "../../utils/helper";
import OAuth from "./OAuth";
import LoginCode from "./LoginCode";

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
      loginLoading: false,
    };
  }

  componentDidMount() {
    this.loadQrCode();
  }

  loadQrCode = () => {
    this.setState({ loginLoading: true });
    this.props
      .getQrCode()
      .then((res) => {
        this.setState({
          qrImg: res.qr_code,
        });
        this.setState({ loginLoading: false });
        var channel2 = echo.channel(`uniqueCode.${res.channel_id}`);
        channel2.listen(".UniqueCodeDecode", (e) => {
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
        this.setState({ loginLoading: false });
      });
  };

  leaveAllChannel() {
    echo.channel("uniqueCode.*").stopListening("UniqueCodeDecode");
    echo.leaveChannel("uniqueCode.*");
  }

  handleCancel = (e) => {
    console.log(e);
    this.props.toggleAuthModel(false);
  };

  handleSignupSubmit = (values) => {
    this.setState({ loginLoading: true });
    this.props
      .userSignup(values)
      .then((res) => {
        saveTokens(res);
        setTimeout(() => {
          setUpInit();
          this.props.getUserProfile().then(() => {
            this.setState({ loginLoading: false });
            this.props.toggleAuthModel(false);
          });
        }, 1000);
      })
      .catch((error) => {
        this.setState({ loginLoading: false });
        if (error.response) {
          notification.error(errorFormater(error.response.data, 10));
        }
      });
  };

  handleLoginSubmit = (values) => {
    this.setState({ loginLoading: true });
    this.props
      .userLogin(values)
      .then((res) => {
        saveTokens(res);
        setTimeout(() => {
          setUpInit();
          this.props.getUserProfile().then(() => {
            this.setState({ loginLoading: false });
            this.props.toggleAuthModel(false);
          });
        }, 300);
      })
      .catch((error) => {
        this.setState({ loginLoading: false });
        if (error.response) {
          notification.error(errorFormater(error.response.data, 10));
        }
      });
  };

  render() {
    return (
      <Modal width={600} footer={false} visible={true} onCancel={this.handleCancel} className="site-model">
        <div className="container">
          <div className="row">
            <div className="col-sm text-center">
              <Spin spinning={this.state.loginLoading}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="QR Code" key="1" className="d-flex justify-content-center">
                    <div className="col">
                      <LoginCode {...this.state} loadQrCode={this.loadQrCode} />
                    </div>
                  </TabPane>
                  <TabPane tab="OAuth Option" key="2" className="d-flex justify-content-center">
                    <div className="col">
                      <OAuth />
                    </div>
                  </TabPane>
                  <TabPane tab="Sign In" key="3" className="d-flex justify-content-center">
                    <div className="col-9 text-left">
                      <LoginForm onSubmit={this.handleLoginSubmit} />
                    </div>
                  </TabPane>
                  <TabPane tab="Sign Up" key="4" className="d-flex justify-content-center">
                    <div className="col-9 text-left">
                      <SignUpForm onSubmit={this.handleSignupSubmit} />
                    </div>
                  </TabPane>
                </Tabs>
              </Spin>
            </div>
          </div>
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
