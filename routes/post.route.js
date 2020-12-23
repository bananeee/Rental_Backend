import express from "express";
const router = express.Router();

import {
    createPostController,
    getPostsController,
    getAPostController,
    likePostController,
    unLikePostController,
    commentPostController,
    updatePostController
} from "../controllers/posts.controller.js";

import { verifyToken, requireLogin } from "../middlewares/auth.middleware.js";

router.get("/", getPostsController);

router.get("/:id", getAPostController);

router.post("/", verifyToken, requireLogin, createPostController);

router.put("/:id", verifyToken, requireLogin, updatePostController);

router.put("/comment/:id", verifyToken, requireLogin, commentPostController);

router.put("/like/:id", verifyToken, requireLogin, likePostController);

router.put("/unlike/:id", verifyToken, requireLogin, unLikePostController);



export default router;
