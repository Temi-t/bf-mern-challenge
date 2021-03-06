import {
  CREATE,
  FETCH_ALL,
  UPDATE,
  LIKE,
  DELETE,
} from "../constants/actionTypes";
export default function postReducer(posts = [], action) {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    //fallthrough, since update and like are similar
    case UPDATE:
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
}
