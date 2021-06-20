import axios from "../helpers/axios";
import { contactConstants } from "./constants";

export const getContacts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: contactConstants.GET_ALL_CONTACTS_REQUEST });
      const res = await axios.get(`contact/get`);
      if (res.status === 200) {
        const { contacts } = res.data;
        dispatch({
          type: contactConstants.GET_ALL_CONTACTS_SUCCESS,
          payload: { contacts },
        });
      } else {
        dispatch({ type: contactConstants.GET_ALL_CONTACTS_FAILURE });
      }
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };
};

// export const addContact = (form) => {
//   return async (dispatch) => {
//     try{
//       dispatch
//     }
//   }
// }
