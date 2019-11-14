import React from "react";
import cuid from "cuid";
import config from "./../../config";
import queryString from "query-string";

const OAuth = (props) => {
  const onClickLogin = () => {
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
  return (
    <button onClick={onClickLogin} type="button" className="btn btn-outline-primary">
      Login With Laravel Passport
    </button>
  );
};

export default OAuth;
