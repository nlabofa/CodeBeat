import * as types from "../actions/actionTypes";

const initialState = {
  userdata: null,
  usertoken: null,
  guestuser: null,
  user_playlist: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_USER_DATA:
      return {
        ...state,
        userdata: action.userdata
      };
    case types.SAVE_USER_TOKEN:
      return {
        ...state,
        usertoken: action.usertoken
      };
    case types.SAVE_GUEST_USER:
      return {
        ...state,
        guestuser: action.guestuser
      };
    case types.SAVE_USER_PLAYLIST:
      return {
        ...state,
        user_playlist: action.user_playlist
      };
    case types.CLEAR_USER_DATA:
      return initialState;
    default:
      return state;
  }
}
