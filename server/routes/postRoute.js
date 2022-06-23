import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);
//router.get("/:id", getPosts) for stories page;
router.post("/", authMiddleware, createPost);
router.patch("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);
router.patch("/:id/likePost", authMiddleware, likePost); // authMiddleware needed here to prevent multiple "likes"

export default router;
