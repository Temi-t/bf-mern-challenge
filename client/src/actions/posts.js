import * as api from '../api';

//action creators
export const getPosts = () => async (dispatch) => {
  try{
    const { data } = await api.fetchPosts();
    dispatch({ 
      type: 'FETCH_ALL', 
      payload: data
    });
  }catch(error){
    console.log("getPosts->failed:",error)
  };
}

export const createPost = (post) => async (dispatch) => {
  try{
    const { data } = await api.createPost(post)
    dispatch({
      type: "CREATE",
      payload: data
    });
  }catch(error){
    console.log("createPost->failed:", error)
  };
} 

export const updatePost =(id, post)=> async (dispatch)=> {
  try{
    //{data} = await updated response
    const { data } = await api.updatePost(id, post)
    dispatch({
      type: 'UPDATE',
      payload: data
    })
  }catch(error){
    console.log("updatePost->failed: ",error)
  }
}


export const deletePost =(id)=> async (dispatch)=> {
  try{
    await api.deletePost(id)
    dispatch({
      type: 'DELETE',
      payload: id
    })
  }catch(error){
    console.log("deletePost->failed: ",error)
  }
}