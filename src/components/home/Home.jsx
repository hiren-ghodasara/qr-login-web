import React, { Component } from "react";
import cuid from "cuid";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import queryString from "query-string";
import config from "./../../config";

class Home extends Component {
  onClickLogin() {
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
                <div className="qr-code">
                  <img src={"assets/qrcode.png"} alt="qr-code" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

// const Home = props => (
//   <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
//     <Row type="flex" justify="space-around">
//       <Col span={12}>
//         <div className="signup-container">
//           <div className="signup-content">
//             <h1 className="signup-title">Auth Option</h1>
//             <div className="social-signup">
//               <img src={"assets/lara_auth.png"} alt="Facebook" />
//               <span>Login With Laravel Passport </span>
//             </div>
//             <div className="or-separator">
//               <span className="or-text">OR</span>
//             </div>
//             <div className="qr-code">
//               <img src={"assets/qrcode.png"} alt="qr-code" />
//             </div>
//           </div>
//         </div>
//       </Col>
//     </Row>
//   </div>
// );

//export default Home;

Home.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Home);
