import { AUTH, LOGOUT } from "../constants/actionTypes";

const initialState = { authData: null };

function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH:
      console.log("AUTH => ", action.payload);
      localStorage.setItem(
        "user.profile",
        JSON.stringify({ ...action?.payload })
      );
      return { ...state, authData: action?.payload };
    case LOGOUT:
      localStorage.removeItem("user.profile");
      return { ...state, authData: null };
    default:
      return state;
  }
}

export default authReducer;
