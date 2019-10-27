import * as actionTypes from "./actionTypes";

export const LoaderStart = () => {
  return {
    type: actionTypes.LOADER_START
  };
};
export const LoaderStop = () => {
  return {
    type: actionTypes.LOADER_STOP
  };
};
export const ItemLoaderStart = () => {
  return {
    type: actionTypes.ITEM_LOADER_START
  };
};
export const ItemLoaderStop = () => {
  return {
    type: actionTypes.ITEM_LOADER_STOP
  };
};
export function alertMessage(res) {
  return {
    type: actionTypes.ALERT_MESSAGE,
    message: res
  };
}
export function clearMessage() {
  return {
    type: actionTypes.REMOVE_MESSAGE
  };
}
