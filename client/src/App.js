import React, { useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import userImg from './images/stephen-unsplash.jpg';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';

export default function App (){
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(()=>{
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container maxidth='lg'>
    <AppBar position="static" color="inherit" className={classes.appBar}>
        <Typography variant="h2" align="center" className={classes.heading}>
          My Story 
        </Typography>
        <img src={userImg} alt="user" height="60" className={classes.image}/>
    </AppBar>
        {/*animation*/}
    <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7} >
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4} >
              <Form />
            </Grid>
          </Grid>
        </Container>
    </Grow>
    </Container>
  )
}
