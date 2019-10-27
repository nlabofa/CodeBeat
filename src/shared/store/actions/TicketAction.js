import * as constant from "../Constants";
import * as actionTypes from "./actionTypes";
import axios from "axios";
import { store } from "../root.store";
import {
  LoaderStart,
  ItemLoaderStop,
  ItemLoaderStart,
  LoaderStop,
  alertMessage,
  clearMessage
} from "./index";
//import store from "../../root.store";
//import AsyncStorage from "@react-native-community/async-storage";
import NavigationService from "../../Routes/NavigationService";

export const saveTicketType = data => {
  return {
    type: actionTypes.SAVE_TICKET_TYPE,
    ticket_type: data
  };
};
export const saveGuestList = data => {
  return {
    type: actionTypes.SAVE_GUEST_LIST,
    guest_list: data
  };
};
export const addTicketItemToCart = item => {
  return {
    type: actionTypes.ADD_TICKET_ITEM_TO_CART,
    ticket_checkout: item
  };
};
export const timerExpired = () => {
  return {
    type: actionTypes.TIMER_EXPIRED
  };
};
export const replaceTicketItemToCart = item => {
  return {
    type: actionTypes.REPLACE_TICKET_ITEM_TO_CART,
    ticket_checkout: item
  };
};
export const saveTransactionID = ref => {
  return {
    type: actionTypes.SAVE_TRANSACTION_ID,
    transaction_id: ref
  };
};
export const addTicketConcessionItem = item => {
  return {
    type: actionTypes.ADD_TICKET_CONCESSION_ITEM_TO_CART,
    ticket_concession_checkout: item
  };
};
export const replaceTicketConcessionItemInCart = item => {
  return {
    type: actionTypes.REPLACE_TICKET_CONCESSION_ITEM_IN_CART,
    ticket_concession_checkout: item
  };
};
export const totalTicketPrice = amount => {
  return {
    type: actionTypes.TOTAL_TICKET_PRICE,
    totalticketprice: amount
  };
};
export const totalTicketConcessionPrice = amount => {
  return {
    type: actionTypes.TOTAL_TICKET_CONCESSION_PRICE,
    totalticketconcessionprice: amount
  };
};
export const saveActiveUser = data => {
  return {
    type: actionTypes.SAVE_ACTIVE_USER,
    activeuser: data
  };
};
export const clearTicketPrice = () => {
  return {
    type: actionTypes.CLEAR_TICKET_PRICE
  };
};
export const clearTicketCheckout = () => {
  return {
    type: actionTypes.CLEAR_TICKET_CHECKOUT
  };
};
export const clearTicketConcessionCheckout = () => {
  return {
    type: actionTypes.CLEAR_TICKET_CONCESSION_CHECKOUT
  };
};
export const saveCountDownTimer = timer => {
  return {
    type: actionTypes.SAVE_COUNTDOWN_TIMER,
    timer: timer
  };
};
export const removeItem = () => {
  return {
    type: actionTypes.REMOVE_ITEM_PRICE
  };
};
export const saveTicketPaymentref = value => {
  return {
    type: actionTypes.SAVE_TICKET_PAYMENT_REF,
    ticket_ref: value
  };
};
export const saveTicketConcessionCartId = id => {
  return {
    type: actionTypes.SAVE_TICKET_CONCESSION_ID,
    cartId: id
  };
};
export const updateTicketConcessionPrice = () => {
  return dispatch => {
    const cartitems = store.getState().ticketReducer.ticket_concession_checkout;
    let sum = cartitems.reduce(
      (accum, obj) => accum + obj.price * obj.quantity,
      0
    );
    dispatch(totalTicketConcessionPrice(sum));
  };
};
export const fetchTicketType = data => {
  console.log(data);
  return dispatch => {
    dispatch(ItemLoaderStart());
    axios
      .post(constant.baseUrl + "/filmhouse/get-ticket-types", data)
      .then(response => {
        dispatch(ItemLoaderStop());

        console.log(response);
        if (response.status == 200) {
          dispatch(saveTicketType(response.data.ticketTypes));
          // NavigationService.navigate("TicketStep1");
        }
      })
      .catch(err => {
        dispatch(ItemLoaderStop());

        // console.log(err);
        console.log(err.response.data);
      });
  };
};
export const updateTicketPrice = () => {
  return dispatch => {
    const cartitems = store.getState().ticketReducer.ticket_checkout;
    let sum = cartitems.reduce(
      (accum, obj) => accum + obj.price * obj.quantity,
      0
    );
    dispatch(totalTicketPrice(sum));
    // console.log(sum);
  };
};
export const removeItemPrice = item => {
  return dispatch => {
    const cartitems = store.getState().ticketReducer.ticket_checkout;
    const removeticket = cartitems.filter(el => el.name == item);
    console.log(removeticket);
    // let sum = cartitems.reduce(
    //   (accum, obj) => accum + obj.price * obj.quantity,
    //   0
    // );
    // dispatch(totalTicketPrice(sum));
    // console.log(sum);
  };
};
export const createTicketCart = () => {
  return dispatch => {
    dispatch(clearMessage());
    dispatch(LoaderStart());
    axios
      .post(constant.baseUrl + "/shopping-carts")
      .then(response => {
        // dispatch(LoaderStop());
        console.log(response);
        if (response.status == 201) {
          const cartitems = store.getState().ticketReducer.ticket_checkout;
          const userdata = store.getState().authReducer.userdata;
          const activeuser = store.getState().ticketReducer.activeuser;

          cartitems.forEach(task => {
            task.cartId = response.data.id;
            task.ownerName = activeuser.ownerName;
            task.ownerEmail = activeuser.ownerEmail;
          });

          console.log(cartitems);

          dispatch(saveTicketPaymentref(response.data.paymentReference));
          dispatch(saveTicketConcessionCartId(response.data.id));
          //dispatch(replaceCheckoutItems(mapped));
          dispatch(postTicketCart()); // send the cart object to backend
        }
      })
      .catch(err => {
        dispatch(LoaderStop());
        // console.log(err);
        console.log(err.response.data);
        //dispatch(alertMessage(err.response.data.message));
      });
  };
};
export const postTicketCart = () => {
  return dispatch => {
    axios
      .post(
        constant.baseUrl + "/shopped-movie-tickets",
        store.getState().ticketReducer.ticket_checkout
      )
      .then(response => {
        dispatch(LoaderStop());
        console.log(response);
        if (response.status == 201) {
          dispatch(alertMessage("add to cart success"));
          setTimeout(() => {
            dispatch(clearMessage());
          }, 2000);
        }
      })
      .catch(err => {
        dispatch(LoaderStop());
        // console.log(err);
        console.log(err.response.data);
        //dispatch(alertMessage(err.response.data.message));
      });
  };
};
export const createTicketConcession = () => {
  return dispatch => {
    dispatch(LoaderStart());
    const cartitems = store.getState().ticketReducer.ticket_concession_checkout;
    const cartId = store.getState().ticketReducer.cartId;

    cartitems.forEach(task => {
      task.cartId = cartId;

      //console.log(cartitems);
      dispatch(postTicketConcessionCart());
    });
  };
};
export const postTicketConcessionCart = () => {
  return dispatch => {
    axios
      .post(
        constant.baseUrl + "/shopped-concessions",
        store.getState().ticketReducer.ticket_concession_checkout
      )
      .then(response => {
        dispatch(LoaderStop());
        console.log(response);
        if (response.status == 201) {
          dispatch(alertMessage("show modal"));
          setTimeout(() => {
            dispatch(clearMessage());
          }, 2000);
        }
      })
      .catch(err => {
        dispatch(LoaderStop());
        // console.log(err);
        console.log(err.response.data);
        //dispatch(alertMessage(err.response.data.message));
      });
  };
};
