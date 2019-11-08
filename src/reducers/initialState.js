import { loadUserFromLocal } from "../localStorage";
const persistedState = loadUserFromLocal();
export default {
  user: Object.assign(persistedState, { userList: [], userInfo: {}, authModel: false }),
  ajaxCallsInProgress: 0,
  contest: {
    data: [],
    total: 0,
    per_page: 10,
    current_page: 1,
    filterData: {
      price: { min: 0, max: 100 },
      contests_type: [],
      organizer: [],
      sortArr: [
        { key: "execution_date", text: "Execution Date", isActive: true, sortBy: "asc" },
        { key: "joining_fee", text: "Cheapest", isActive: false, sortBy: "asc" },
        { key: "joined_user", text: "Availability", isActive: false, sortBy: "asc" }
      ]
    },
    listLoader: false
  }
};
