import express from "express";
import {
  signinController,
  signupController,
} from "../controllers/userController.js";

const router = express.Router();

/*router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);
*/

router.post("/signin", signinController);
router.post("/signup", signupController);

export default router;
