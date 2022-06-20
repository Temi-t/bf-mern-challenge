import React, { useState, useEffect } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { GoogleLogin } from "@react-oauth/google";
//import { googleLogout } from '@react-oauth/google';
//declare function googleLogout(): void;
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { AUTH } from "../../constants/actionTypes";
import { useNavigate } from "react-router-dom";
import { signup, signin } from "../../actions/authActions";
//import { GoogleLogin } from "react-google-login";
//import Icon from "./icon";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //useEffect(() => {}, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData===> ", formData);
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    //handleSubmit();
  };
  /*const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
    //handleSubmit();
  }; */

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const switchMode = () => {
    setIsSignup((prev) => !prev);
    setShowPassword(false);
  };

  const googleSuccess = async (credentialRes) => {
    const encodedToken = credentialRes.credential;
    const userObj = jwt_decode(encodedToken);
    try {
      dispatch({
        type: AUTH,
        payload: { userObj, encodedToken },
      });
      //onSuccess, navigate to home screen
      navigate("/bf-mern-challenge");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log("Google Sign In was ** unsuccessful **. Try Again Later");
    console.log(error);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {/*if signing up: show sign up button otherwise sign in*/}
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* if signing up: show first and last name inputs*/}
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  placeholder="First Name"
                  label="First name"
                  handleInputChange={handleInputChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  label="Last name"
                  handleInputChange={handleInputChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              type="email"
              label="Email Address"
              handleInputChange={handleInputChange}
            />
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              handleInputChange={handleInputChange}
            />
            {/*if signing up: show confirm password*/}
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                type="password"
                handleInputChange={handleInputChange}
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          {/*          <GoogleLogin
            clientId="945637216270-ajmjt9pk0a9593q56sll9f2vjf8aup0o.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
            */}

          <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleFailure}
            cookiePolicy="single_host_origin"
            width="364"
          />

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
