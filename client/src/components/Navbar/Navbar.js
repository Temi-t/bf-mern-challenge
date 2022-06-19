import React, { useEffect, useState } from "react";
import userImg from "../../images/storyImg.jpeg";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";

function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user.profile"))
  );
  console.log("user major==> ", user);
  /*useEffect(() => {
    const token = user?.encodedToken;

    //JWT ...
    setUser(JSON.parse(localStorage.getItem("user.profile")));
  }, []);*/

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    navigate("/bf-mern-challenge");
    setUser(null);
  };

  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/bf-mern-challenge"
          variant="h2"
          align="center"
          className={classes.heading}
        >
          My Story
        </Typography>
        <img src={userImg} alt="user" height="60" className={classes.image} />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.userObj.given_name}
              src={user.userObj.picture}
            >
              {user.userObj.given_name.charAt(0)}
              {/*user.name.charAt(0)*/}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.userObj.given_name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
            onClick={() => {}}
          >
            {" "}
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
