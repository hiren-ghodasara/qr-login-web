import configureStore from "../store/configureStore";

const store = configureStore();

const authService = {
  isAuthenticated() {
    let userInfo = store.getState() && store.getState().user && store.getState().user.isAuthenticated;
    console.log("userInfo",userInfo);
    return userInfo;
  }
};

export default authService;
