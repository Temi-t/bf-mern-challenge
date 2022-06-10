import useStyles from './style';
import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } 
from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from  'react-redux';
import { deletePost } from '../../../actions/posts';


export default function Post({ post, setCurrentId }){
  const dispatch = useDispatch();
  const classes = useStyles();
  const cardStyle = {
    height: "3rem",
    overflow: 'auto',
};
  return (
    <Card className={classes.card} >
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />

      <div className={classes.overlayContainer}>
        <div className={classes.overlay}>
          <Typography variant="h5">{post.creator}</Typography>
          <Typography variant="body2" color="textSecondary">{moment(post.createdAt).fromNow()}</Typography>
        </div>

        <div className={classes.overlay2}>
          <Button style={{color: "grey"}} 
            size="small" 
            onClick={()=> setCurrentId(post._id) }
            title="edit"
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>

      </div>

      <div className={classes.details}>
        {/*hashtags*/}
        {/*
        */}
        <Typography variant="body2" color="textSecondary">
          {post.tags.map( (tag)=> `#${tag} ` )}
        </Typography>
      </div>  
        <CardContent style={cardStyle}>
          <Typography   className={classes.title}  variant="h6" gutterBottom>{post.message}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" onClick={ ()=>{} }>
            <ThumbUpAltIcon  fontSize="small" />
            Like {post.likeCount}
          </Button>
          <Button size="small" 
            color="primary" 
            title="Delete this story" 
            onClick={ ()=> dispatch(deletePost(post._id)) }
          >
            <DeleteIcon  fontSize="small" />
            Delete 
          </Button>
        </CardActions>
    </Card>
  );
}
