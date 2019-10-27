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
//import { LoaderStart, LoaderStop } from "../index";
//import AsyncStorage from "@react-native-community/async-storage";
//import NavigationService from "../../../Routes/NavigationService";

export const saveConcessions = items => {
  return {
    type: actionTypes.SAVE_CONCESSION_ITEMS,
    concession_items: items
  };
};
export const saveMerchandise = items => {
  return {
    type: actionTypes.SAVE_MERCHANDISE_ITEMS,
    merchandise_items: items
  };
};
export const addItemToCart = item => {
  return {
    type: actionTypes.ADD_ITEM_TO_CART,
    checkout: item
  };
};
export const replaceItemInCart = item => {
  return {
    type: actionTypes.REPLACE_ITEM_IN_CART,
    checkout: item
  };
};
export const totalPrice = amount => {
  return {
    type: actionTypes.TOTAL_PRICE,
    totalpriceval: amount
  };
};
export const clearCartItems = () => {
  return {
    type: actionTypes.CLEAR_CART_ITEMS
  };
};
export const savePaymentref = ref => {
  return {
    type: actionTypes.SAVE_PAYMENT_REF,
    paymentref: ref
  };
};
export const totalCountRef = count => {
  return {
    type: actionTypes.SAVE_ITEMS_COUNT,
    itemcount: count
  };
};
export const replaceCheckoutItems = data => {
  return {
    type: actionTypes.REPLACE_CHECKOUT_ITEMS,
    checkout: data
  };
};
export const fetchShopItems = params => {
  //params can be 'concession' or 'merchandise'
  return dispatch => {
    axios
      .get(
        constant.baseUrl +
          `/concessions?$limit=${12}&productType=${params}&$order=id`
      )
      .then(response => {
        console.log(response.data.data);
        params == "merchandise"
          ? dispatch(saveMerchandise(response.data.data))
          : dispatch(saveConcessions(response.data.data));
      })
      .catch(err => {
        console.log(err);
        console.log(err.response.data);
      });
  };
};
export const updatePrice = () => {
  return dispatch => {
    const cartitems = store.getState().shopReducer.checkout;
    let sum = cartitems.reduce(
      (accum, obj) => accum + obj.price * obj.quantity,
      0
    );
    dispatch(totalPrice(sum));
    dispatch(totalCount());
    // console.log(sum);
  };
};
export const totalCount = () => {
  return dispatch => {
    const cartitems = store.getState().shopReducer.checkout;
    let sum = cartitems.reduce((accum, obj) => accum + obj.quantity, 0);
    dispatch(totalCountRef(sum));
  };
};
export const createCart = () => {
  return dispatch => {
    dispatch(clearMessage());
    dispatch(LoaderStart());
    axios
      .post(constant.baseUrl + "/shopping-carts")
      .then(response => {
        // dispatch(LoaderStop());
        console.log(response);
        if (response.status == 201) {
          const cartitems = store.getState().shopReducer.checkout;
          const userdata = store.getState().authReducer.userdata;
          const guestuser = store.getState().authReducer.guestuser;
          //map through cartItems and add cartId
          // const mapped = cartitems.map(element => ({
          //   cartId: response.data.id,
          //   ...element
          // }));
          //console.log(mapped);

          cartitems.forEach(task => {
            task.cartId = response.data.id;
            task.ownerName = userdata ? userdata.name : guestuser.ownerName;
            task.ownerEmail = userdata ? userdata.email : guestuser.ownerEmail;
          });

          // console.log(cartitems);

          dispatch(savePaymentref(response.data.paymentReference));
          //dispatch(replaceCheckoutItems(mapped));
          dispatch(postCart()); // send the cart object to backend
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

export const postCart = () => {
  return dispatch => {
    axios
      .post(
        constant.baseUrl + "/shopped-concessions",
        store.getState().shopReducer.checkout
      )
      .then(response => {
        dispatch(LoaderStop());
        console.log(response);
        if (response.status == 201) {
          dispatch(alertMessage("trigger paystack"));
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
