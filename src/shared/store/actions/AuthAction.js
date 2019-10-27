import * as constant from "../Constants";
import * as actionTypes from "./actionTypes";
import axios from "axios";
import { store } from "../root.store";
import {
  LoaderStart,
  ItemLoaderStop,
  ItemLoaderStart,
  clearCartItems,
  LoaderStop,
  alertMessage,
  clearMessage
} from "./index";
import AsyncStorage from "@react-native-community/async-storage";
import NavigationService from "../../Routes/NavigationService";

const setAsync = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log("setting async error");
  }

  console.log("Done setting");
};
const removeAsync = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
  console.log("Done removing.");
};
export const saveUserData = data => {
  return {
    type: actionTypes.SAVE_USER_DATA,
    userdata: data
  };
};
export const saveUserToken = data => {
  return {
    type: actionTypes.SAVE_USER_TOKEN,
    usertoken: data
  };
};
export const clearUserData = () => {
  return {
    type: actionTypes.CLEAR_USER_DATA
  };
};
export const saveGuestUser = data => {
  return {
    type: actionTypes.SAVE_GUEST_USER,
    guestuser: data
  };
};
export const saveUserPlayList = data => {
  return {
    type: actionTypes.SAVE_USER_PLAYLIST,
    user_playlist: data
  };
};
export const fetchUserPlaylist = () => {
  const token = store.getState().authReducer.usertoken;
  return dispatch => {
    // dispatch(LoaderStart());
    axios
      .get(constant.baseUrl + `/playlists`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        // console.log(response);
        dispatch(saveUserPlayList(response.data.data));
      })
      .catch(err => {
        console.log(err);
        console.log(err.response.data);
      });
  };
};
export const updateUserPlaylist = data => {
  const token = store.getState().authReducer.usertoken;
  return dispatch => {
    dispatch(LoaderStart());
    axios
      .post(constant.baseUrl + `/playlists`, data, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        dispatch(LoaderStop());
        dispatch(alertMessage("user playlist has been updated"));
        setTimeout(() => {
          dispatch(clearMessage());
        }, 2000);
        console.log(response);
      })
      .catch(err => {
        dispatch(LoaderStop());
        console.log(err);
        console.log(err.response.data);
      });
  };
};
export const updateUserProfile = data => {
  const token = store.getState().authReducer.usertoken;
  const userId = store.getState().authReducer.userdata.id;
  return dispatch => {
    dispatch(LoaderStart());
    axios
      .patch(constant.baseUrl + `/users/${userId}`, data, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        dispatch(LoaderStop());
        dispatch(saveUserData(response.data));
        setAsync("userdata", JSON.stringify(response.data));
        dispatch(alertMessage("date of birth updated"));
        setTimeout(() => {
          dispatch(clearMessage());
        }, 2000);
        console.log(response);
      })
      .catch(err => {
        dispatch(LoaderStop());
        console.log(err);
        console.log(err.response.data);
      });
  };
};
export const signIn = data => {
  console.log(data);
  return dispatch => {
    dispatch(clearMessage());
    dispatch(LoaderStart());
    axios
      .post(constant.baseUrl + "/auth/login", data)
      .then(response => {
        dispatch(LoaderStop());
        console.log(response);
        if (response.status == 200) {
          dispatch(saveUserToken(response.data.jwt));
          dispatch(saveUserData(response.data.user));
          setAsync("userdata", JSON.stringify(response.data.user));
          setAsync("usertoken", response.data.jwt);
          dispatch(alertMessage("login success"));
          setTimeout(() => {
            dispatch(clearMessage());
          }, 2000);
          // NavigationService.navigate("Tabscreens");
        }
      })
      .catch(err => {
        dispatch(LoaderStop());
        // console.log(err);
        console.log(err.response.data);
        dispatch(alertMessage(err.response.data.message));
      });
  };
};
export const signUp = data => {
  console.log(data);
  return dispatch => {
    dispatch(clearMessage());
    dispatch(LoaderStart());
    axios
      .post(constant.baseUrl + "/users", data)
      .then(response => {
        dispatch(LoaderStop());
        console.log(response);
        if (response.status == 201) {
          dispatch(
            alertMessage(
              "200" +
                "," +
                "You have successfully signed up! Kindly check your email to confirm your account."
            )
          );
        }
      })
      .catch(err => {
        dispatch(LoaderStop());
        // console.log(err);
        console.log(err.response.data);
        dispatch(alertMessage("400" + "," + err.response.data.message));
      });
  };
};
export const initiatePasswordReset = email => {
  // console.log(data);
  return dispatch => {
    dispatch(clearMessage());
    dispatch(ItemLoaderStart());
    axios
      .get(constant.baseUrl + "/auth/password-reset?email=" + email)
      .then(response => {
        dispatch(ItemLoaderStop());
        console.log(response);
        if (response.status == 204) {
          dispatch(
            alertMessage(
              "200" +
                "," +
                "A password reset link has been sent to your mail. Kindly check and complete your password change on the web"
            )
          );
          // NavigationService.navigate("Tabscreens");
        }
      })
      .catch(err => {
        dispatch(ItemLoaderStop());
        // console.log(err);
        console.log(err.response.data);
        dispatch(alertMessage("400" + "," + err.response.data.message));
      });
  };
};

export const signOut = () => {
  return dispatch => {
    dispatch(clearUserData());
    dispatch(clearCartItems()); //remove persisted CartItems
    removeAsync("userdata");
    removeAsync("usertoken");
  };
};
