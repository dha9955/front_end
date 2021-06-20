import { contactConstants } from "../actions/constants";

const initialState = {
  contacts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case contactConstants.GET_ALL_CONTACTS_SUCCESS:
      state = {
        ...state,
        contacts: action.payload.contacts,
      };
      break;
  }
  return state;
};
