
import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

export default function Posts({ setCurrentId }){
  const posts = useSelector((state) => state.posts );
  const classes = useStyles(); 
  //<CircularProgress /> 
  console.log(posts);
  return (
      !posts.length ?<h1 style={{color: 'grey'}}> 👋 Hi there! Your stories will appear hear</h1>: (
        <Grid className={classes.container}
          container 
          alignItems="stretch"
          spacing={3}
        > 
          {
            posts.map((post)=> (
              <Grid key={post._id} item xs={12} sm={6}>
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            ))
          }
        </Grid>
      )
  );
}
