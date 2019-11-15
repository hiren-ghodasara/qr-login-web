import initialState from "./initialState";
import * as types from "../actions/actionTypes";
import produce from "immer";

const ApiRecipe = (draft = initialState.contest, action) => {
  switch (action.type) {
    case types.LOAD_API_TOKENS_SUCCESS:
      return {
        ...draft,
        tokens: action.payload,
      };
    case types.DELETE_API_TOKENS_SUCCESS:
      return {
        ...draft,
        tokens: draft.tokens.filter((item) => item.id !== action.payload),
      };
    default:
      return draft;
  }
};

export const apiTokenReducer = produce(ApiRecipe);
