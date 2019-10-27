import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../../utils/utitlity";

const initialState = {
  loading: false,
  itemloading: false,
  message: null
};

const LoaderStart = state => {
  return updateObject(state, { loading: true });
};
const LoaderStop = state => {
  return updateObject(state, { loading: false });
};
const ItemLoaderStart = state => {
  return updateObject(state, { itemloading: true });
};
const ItemLoaderStop = state => {
  return updateObject(state, { itemloading: false });
};
const alertMessage = (state, action) => {
  return updateObject(state, { message: action.message });
};
const clearMessage = state => {
  return updateObject(state, { message: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADER_START:
      return LoaderStart(state);
    case actionTypes.LOADER_STOP:
      return LoaderStop(state);
    case actionTypes.ITEM_LOADER_START:
      return ItemLoaderStart(state);
    case actionTypes.ITEM_LOADER_STOP:
      return ItemLoaderStop(state);
    case actionTypes.ALERT_MESSAGE:
      return alertMessage(state, action);
    case actionTypes.REMOVE_MESSAGE:
      return clearMessage(state);
    default:
      return state;
  }
};

export default reducer;
