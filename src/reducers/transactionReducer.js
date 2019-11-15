import initialState from "./initialState";
import * as types from "../actions/actionTypes";
import produce from "immer";

const TransactionRecipe = (draft = initialState.transaction, action) => {
  switch (action.type) {
    case types.LOAD_TRANSACTION_SUCCESS:
      return {
        ...draft,
        list: action.payload,
      };
    default:
      return draft;
  }
};

export const transactionReducer = produce(TransactionRecipe);
