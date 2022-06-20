import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    //login the user

    navigate("/bf-mern-challenge");
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    //signup the user

    navigate("/bf-mern-challenge");
  } catch (error) {
    console.log(error);
  }
};
