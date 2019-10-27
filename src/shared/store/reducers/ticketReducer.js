import * as types from "../actions/actionTypes";

const initialState = {
  ticket_type: null,
  ticket_checkout: [],
  guest_list: [],
  timerexpired: false,
  ticket_concession_checkout: [],
  transaction_id: null,
  timer: "",
  activeuser: null,
  totalticketconcessionprice: 0,
  cartId: null,
  concession_items: [
    { id: "1", name: "Popcorn", price: 500 },
    { id: "2", name: "Hotdog", price: 1000 },
    { id: "3", name: "Burger", price: 1500 },
    { id: "4", name: "Drinks", price: 500 }
  ],
  ticket_ref: "",
  totalticketprice: 0
};
export default function(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_TICKET_TYPE:
      return {
        ...state,
        ticket_type: action.ticket_type
      };
    case types.SAVE_TRANSACTION_ID:
      return {
        ...state,
        transaction_id: action.transaction_id
      };
    case types.TIMER_EXPIRED:
      return {
        ...state,
        timerexpired: true
      };
    case types.SAVE_ACTIVE_USER:
      return {
        ...state,
        activeuser: action.activeuser
      };
    case types.ADD_TICKET_ITEM_TO_CART:
      return {
        ...state,
        ticket_checkout: [...state.ticket_checkout, ...action.ticket_checkout]
      };
    case types.REPLACE_TICKET_ITEM_TO_CART:
      return {
        ...state,
        ticket_checkout: action.ticket_checkout
      };
    case types.SAVE_COUNTDOWN_TIMER:
      return {
        ...state,
        timer: action.timer,
        timerexpired: false
      };
    case types.SAVE_TICKET_CONCESSION_ID:
      return {
        ...state,
        cartId: action.cartId
      };
    case types.ADD_TICKET_CONCESSION_ITEM_TO_CART:
      return {
        ...state,
        ticket_concession_checkout: [
          ...state.ticket_concession_checkout,
          ...action.ticket_concession_checkout
        ]
      };
    case types.REPLACE_TICKET_CONCESSION_ITEM_IN_CART:
      return {
        ...state,
        ticket_concession_checkout: action.ticket_concession_checkout
      };
    case types.TOTAL_TICKET_CONCESSION_PRICE:
      return {
        ...state,
        totalticketconcessionprice: action.totalticketconcessionprice
      };
    case types.SAVE_GUEST_LIST:
      return {
        ...state,
        guest_list: action.guest_list
      };
    case types.SAVE_TICKET_PAYMENT_REF:
      return {
        ...state,
        ticket_ref: action.ticket_ref
      };
    case types.TOTAL_TICKET_PRICE:
      return {
        ...state,
        totalticketprice: action.totalticketprice
      };
    case types.CLEAR_TICKET_PRICE:
      return {
        ...state,
        totalticketprice: 0,
        totalticketconcessionprice: 0
      };
    case types.CLEAR_TICKET_CHECKOUT:
      return {
        ...state,
        ticket_checkout: []
      };
    case types.CLEAR_TICKET_CONCESSION_CHECKOUT:
      return {
        ...state,
        ticket_concession_checkout: []
      };
    default:
      return state;
  }
}
