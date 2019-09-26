import { loadUserFromLocal } from "../localStorage";
const persistedState = loadUserFromLocal();
export default {
  user: Object.assign(persistedState, { userList: [] ,userInfo: {}}),
  ajaxCallsInProgress: 0
};
