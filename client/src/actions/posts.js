import * as api from "../api";
import {
  CREATE,
  FETCH_ALL,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";

//action creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({
      type: FETCH_ALL,
      payload: data,
    });
  } catch (error) {
    console.log("getPostsAction->failed:", error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({
      type: CREATE,
      payload: data,
    });
  } catch (error) {
    console.log("createPostAction->failed:", error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    //{data} = await updated response
    const { data } = await api.updatePost(id, post);
    dispatch({
      type: UPDATE,
      payload: data,
    });
  } catch (error) {
    console.log("updatePostAction->failed: ", error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({
      type: DELETE,
      payload: id,
    });
  } catch (error) {
    console.log("deletePostAction->failed: ", error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
