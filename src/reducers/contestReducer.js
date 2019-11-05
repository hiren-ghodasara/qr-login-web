import initialState from "./initialState";
import * as types from "../actions/actionTypes";
import produce from "immer";

const giftsRecipe = (draft = initialState.contest, action) => {
  switch (action.type) {
    case types.LOAD_CONTEST_SUCCESS:
      return {
        ...draft,
        ...action.payload
      };
    case types.LOAD_CONTEST_FILTER_SUCCESS:
      return {
        ...draft,
        filterData: action.payload
      };
    case types.ORGANIZER_SEARCH_SUCCESS:
      draft.filterData.organizer.forEach(words => {
        if (!words.user.full_name.toUpperCase().includes(action.payload.toUpperCase())) {
          words.visibility = 0;
        }else{
          words.visibility = 1;
        }
      });
      break
    default:
      return draft;
  }
};

export const contestReducer = produce(giftsRecipe);
