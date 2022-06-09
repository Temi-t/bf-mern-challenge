import PostMessage from '../models/postMessage.js';


export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    //console.log('logging from controllers/posts: ', postMessages)
    res.status(200).json(postMessages)
  }catch(error){
    //not found
    res.status(404).json({message: error.message})
  }
}

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post)
  try{
    await newPost.save();
    res.status(201).json(newPost)
  }catch(error){
    //conflict
    res.status(409).json({ message: error.message })
  }
}
 
