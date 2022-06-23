import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    //console.log('logging from controllers/posts: ', postMessages)
    res.status(200).json(postMessages);
  } catch (error) {
    //not found
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    //conflict
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  //rename id to _id
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  //req is populated with userId coming from authMiddleware in /routes/posts
  if (!req.userId) return res.json({ message: "Unauthenticated" });
  //check if we have the have the post that the user wants to like
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  //get actual post
  const post = await PostMessage.findById(id);
  console.log("Does 'like' or'likeCount' exist here ===> ", post);
  //check if the userId for liking post already exists or if the user has already liked this post before now
  //********* 1:53
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    //like the post if created index variable doesn't exist
    post.likes.push(req.userId);
  } else {
    //dislike the post since this "id" was found to have liked the post before
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  //update the selected Post.
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    //{ likeCount: post.likeCount + 1 },
    post,
    { new: true }
  );
  res.json(updatedPost);
};
