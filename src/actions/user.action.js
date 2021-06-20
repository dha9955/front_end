import { userConstants } from "./constants";
import axios from "../helpers/axios";

export const isUserLoggedIn = () => {
  return async dispatch => {
    const user = JSON.parse(localStorage.getItem('user'));
      if(user){
          dispatch({
              type: userConstants.LOGIN_SUCCESS,
              payload: {
                user,
                authenticate: true
              }
          });
      }else{
          dispatch({
              type: userConstants.LOGIN_FAILURE,
              payload: { error: 'Failed to login' }
          });
      }
  }
}

export const signup = (user) => {
  console.log(user);

  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const res = await axios.post(`/user/signup`, {
      ...user,
    });

    if (res.status === 201) {
      const { message } = res.data;
      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: { message },
      });
    } else {
      if ((res.status = 400)) {
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const signin = (user) => {
  console.log(user);

  return async (dispatch) => {
    dispatch({ type: userConstants.LOGIN_REQUEST });
    const res = await axios.post(`/user/signin`, {
      ...user,
    });

    if (res.status === 200) {
      const { user } = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: userConstants.LOGIN_SUCCESS,
        payload: {
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: userConstants.LOGOUT_REQUEST });
    const res = await axios.post(`/user/signout`);

    if (res.status === 200) {
      localStorage.clear();
      dispatch({ type: userConstants.LOGOUT_SUCCESS });
    } else {
      dispatch({
        type: userConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
