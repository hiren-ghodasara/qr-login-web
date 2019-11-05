import React, { useState, useContext, useEffect,Component } from "react";
import { useSelector } from "react-redux";
//import Cookies from 'js-cookie'

const AuthUserContext = React.createContext();

// // So we don't conflict with your localhost
// const cookieName = "RR5CourseLogged";

// export const AuthUserProvider = ({ children }) => {
//   //const cookieLogged = Cookies.getJSON(cookieName)
//   const cookieLogged = useSelector(state => state.user.isAuthenticated);
//   console.log("cookieLogged", cookieLogged);
//   const [logged, setLogged] = useState(cookieLogged);

//   useEffect(() => {
//     if (logged) {
//       //Cookies.set(cookieName, { logged: true })
//     } else {
//       //Cookies.remove(cookieName)
//     }
//   }, [logged]);
//   console.log("logged", logged);
//   return <AuthUserContext.Provider value={{ logged, setLogged }}>{children}</AuthUserContext.Provider>;
// };

export class AuthUserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { logged: false };
  }
  componentDidMount() {}
  setLogged = () => {
    this.setState({
      logged: true
    });
  };
  render() {
    return (
      <AuthUserContext.Provider value={{ logged: this.state.logged, setLogged: this.setLogged }}>{this.props.children}</AuthUserContext.Provider>
    );
  }
}


export const useAuthUser = () => {
  return AuthUserContext.Consumer
};
