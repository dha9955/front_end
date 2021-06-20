import { contactConstants } from "../actions/constants";

const initialState = {
  contacts: [],
};

let contactReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case contactConstants.GET_ALL_CONTACTS_SUCCESS: {
      let o = {
        ...state,
        contacts: action.payload.contacts,
      };
      return o
    }
  
    default : {
      return state
    }
  }
  
}

export let contactRed = contactReducer