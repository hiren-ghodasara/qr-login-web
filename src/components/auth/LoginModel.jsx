import React, { Component } from "react";
import cuid from "cuid";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Spin, Modal } from "antd";
import queryString from "query-string";
import config from "./../../config";
import { getQrCode, saveTokens, toggleAuthModel, getUserProfile } from "../../actions/userAction";
import Echo from "laravel-echo";
import { setUpInit } from "../../utils/axios-config";

// const LoginModel = () => {
//   const authModel = useSelector(state => state.user.authModel);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getQrCode());
//   }, [authModel]);
//   const handleCancel = e => {
//     console.log(e);
//     dispatch(toggleAuthModel(false));
//   };
//   const handleOk = e => {
//     console.log(e);
//     dispatch(toggleAuthModel(false));
//   };
//   console.log("authModel", authModel);
//   return authModel ? (
//     <Modal footer={false} visible={authModel} onOk={handleOk} onCancel={handleCancel}>
//       <div className="container">
//         <div className="row">
//           <div className="col-sm">One of three columns</div>
//           <div className="col-sm">One of three columns</div>
//         </div>
//       </div>
//     </Modal>
//   ) : null;
// };

// export default LoginModel;

const options = {
  broadcaster: "pusher",
  key: "ef9bcd4ecd1038dd7de2",
  cluster: "ap2",
  forceTLS: true
};
const echo = new Echo(options);

class LoginModel extends Component {
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
            setUpInit();
            this.props.getUserProfile();
            this.props.toggleAuthModel(false);
            //window.location.href = process.env.PUBLIC_URL;
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

  handleOk = e => {
    console.log(e);
  };

  handleCancel = e => {
    console.log(e);
    this.props.toggleAuthModel(false);
  };

  render() {
    return (
      <Modal width={800} footer={false} visible={true} onOk={this.handleOk} onCancel={this.handleCancel} className="site-model">
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <ul className="list-group list-group-flush ">
                <li className="list-group-item bg-transparent">Cras justo odio</li>
                <li className="list-group-item bg-transparent">Dapibus ac facilisis in</li>
                <li className="list-group-item bg-transparent">Morbi leo risus</li>
                <li className="list-group-item bg-transparent">Porta ac consectetur ac</li>
                <li className="list-group-item bg-transparent">Vestibulum at eros</li>
              </ul>
            </div>
            <div className="col-sm text-center ">
              <h6 className="signup-title">Login Option</h6>
              <button onClick={this.onClickLogin} type="button" className="btn btn-outline-primary">
                Login With Laravel Passport{" "}
              </button>
              <div className="dropdown-divider"></div>
              <button type="button" className="btn btn-primary" onClick={this.loadQrCode}>
                Get Code
              </button>
              <div className="dropdown-divider"></div>
              <Spin tip="Loading..." spinning={this.state.loading}>
                {this.state.qrImg && (
                  <div className="qr-code">
                    <img alt="qr-code" src={`data:image/jpeg;base64,${this.state.qrImg}`} />
                  </div>
                )}
              </Spin>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

LoginModel.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  getQrCode,
  toggleAuthModel,
  getUserProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModel);
