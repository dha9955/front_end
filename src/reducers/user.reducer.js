import { userConstants } from "../actions/constants";

const initState = {
  user: {
    _id: "",
    email: "",
  },
  authenticate: false,
  error: null,
  message: "",
  loading: false,
};

export default (state = initState, action) => {

  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      state = {
        ...state,
      };
      break;
    case userConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        authenticate: true,
      };
      break;
    case userConstants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userConstants.USER_REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case userConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;
    case userConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
  }
  return state;
};
