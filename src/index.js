import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store/configureStore";
import { onLocalLogin } from "./actions/userAction";

const store = configureStore();
store.dispatch(onLocalLogin());

ReactDOM.render(
  <Provider store={store}>
    {/* <StrictMode> */}
      <App />
    {/* </StrictMode> */}
  </Provider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
