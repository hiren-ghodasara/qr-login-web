import React, { Component } from "react";

const AuthContext = React.createContext();

class AuthProvider extends Component {
  setLogged = val => {
    this.setState({ logged: val });
  };
  render() {
    const { isAuthenticated } = this.props.user;
    return (
      <AuthContext.Provider
        value={{
          currentAuth: {
            logged: isAuthenticated
          }
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };

//export default connect(mapStateToProps)(AuthProvider);
