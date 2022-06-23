import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    //login the user
    const { data } = await api.signInUser(formData);
    dispatch({ type: AUTH, payload: data });

    navigate("/");
    //navigate("/bf-mern-challenge");
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    //signup the user
    const { data } = await api.signUpUser(formData);
    console.log("Signup response from authAction=>", data);
    dispatch({ type: AUTH, payload: data });

    navigate("/");
    //navigate("/bf-mern-challenge");
  } catch (error) {
    console.log(error);
  }
};
