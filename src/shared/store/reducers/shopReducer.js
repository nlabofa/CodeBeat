import * as types from "../actions/actionTypes";

const initialState = {
  concession_items: null,
  merchandise_items: null,
  checkout: [],
  paymentref: "",
  itemcount: 0,
  totalpriceval: 0
};
export default function(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_CONCESSION_ITEMS:
      return {
        ...state,
        concession_items: action.concession_items
      };
    case types.SAVE_MERCHANDISE_ITEMS:
      return {
        ...state,
        merchandise_items: action.merchandise_items
      };
    case types.ADD_ITEM_TO_CART:
      return {
        ...state,
        checkout: [...state.checkout, ...action.checkout]
      };
    case types.REPLACE_ITEM_IN_CART:
      return {
        ...state,
        checkout: action.checkout
      };
    case types.SAVE_ITEMS_COUNT:
      return {
        ...state,
        itemcount: action.itemcount
      };
    case types.REPLACE_CHECKOUT_ITEMS:
      return {
        ...state,
        checkout: action.checkout
      };
    case types.SAVE_PAYMENT_REF:
      return {
        ...state,
        paymentref: action.paymentref
      };
    case types.TOTAL_PRICE:
      return {
        ...state,
        totalpriceval: action.totalpriceval
      };
    case types.CLEAR_CART_ITEMS:
      return {
        ...state,
        checkout: [],
        paymentref: "",
        itemcount: 0,
        totalpriceval: 0
      };
    default:
      return state;
  }
}
