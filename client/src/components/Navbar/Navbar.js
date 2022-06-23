import React, { useEffect, useState } from "react";
import userImg from "../../images/storyImg.jpeg";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";

function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user.profile"))
  );
  console.log("user major==> ", user);
  useEffect(() => {
    const token = user?.encodedToken;
    //const token = user.encodedToken ? user?.encodedToken : user.token;

    //JWT ...
    setUser(JSON.parse(localStorage.getItem("user.profile")));
    //perform update: help display avatar and logout on arrival from auth page
  }, [location]);

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    navigate("/");
    //navigate("/bf-mern-challenge");
    setUser(null);
  };

  //const userName = user.result.name || user.userObj?.given_name;
  //const userPicture = user.result.picture || user.userObj?.picture;

  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          //to="/bf-mern-challenge"
          variant="h2"
          align="center"
          className={classes.heading}
        >
          My Story
        </Typography>
        <img src={userImg} alt="user" height="60" className={classes.image} />
      </div>
      <Toolbar className={classes.toolbar}>
        {/* user.userObj => googleAuth, user.result => customAuth */}
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.userObj?.given_name || user.result.name}
              src={user.userObj?.picture || user.result.picture}
              //src={userPicture}
              //alt={userName}
            >
              {/*user.name.charAt(0)*/}
              {user.result.name.charAt(0).toUpperCase ||
                user.userObj.given_name.charAt(0).toUpperCase}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.userObj?.given_name || user.result.name}
              {/*userName*/}
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
