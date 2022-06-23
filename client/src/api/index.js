import axios from "axios";

//axios instance
const API = axios.create({ baseState: "http://localhost:5000" });
//const url = "https://bf-mern.herokuapp.com/posts";
//const url = "http://localhost:5000/posts";
export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

//routes for signin and signup
export const signInUser = (formData) => API.post("/users/signin", formData);
export const signUpUser = (formData) => API.post("/users/signup", formData);
