import initialState from "./initialState";
import * as types from "../actions/actionTypes";
import produce from "immer";

const PaymentMethodRecipe = (draft = initialState.transaction, action) => {
  switch (action.type) {
    case types.LOAD_PAYMENT_METHOD_SUCCESS:
      return {
        ...draft,
        list: action.payload.data,
      };
    default:
      return draft;
  }
};

export const paymentMethodReducer = produce(PaymentMethodRecipe);
