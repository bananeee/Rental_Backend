import express from "express";
import mongoose from "mongoose";

// Import mongoose schema

import Post from "../models/post.model.js";

// Create routes
const getAllPosts = async () => {
    try {
        return await Post.find()
            .populate("postedBy", "_id name")
            .sort("createdAt");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getPostsByQuery = async (query) => {
    try {
        return await Post.find(query)
            .populate("postedBy", "_id name")
            .sort("createdAt");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPostsController = async (req, res) => {
    const post =
        Object.keys(req.query).length !== 0 ? getPostsByQuery : getAllPosts;
    res.status(200).json({ post });
};

export const getAPostController = async (req, res) => {
    const { id } = req.params;

    try {
        const posts = await Post.findById(id)
            .populate("postedBy", "_id name")
            .sort("createdAt");
        res.status(200).json({ posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPostController = async (req, res) => {
    if (req.user.role !== "host") {
        return res.status(403).json({ message: "You are not host" });
    }

    const newPostModel = new Post({
        ...req.body,
        postedBy: req.user._id,
    });

    try {
        await newPostModel.save();
        res.status(200).json({ newPostModel });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const deletePostController = async (req, res) => {
    if (req.user.role !== "host") {
        return res.status(403).json({ message: "You are not host" });
    }

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id: ${id}`);
    }
    try {
        // await PostModel.findByIdAndRemove(id)
        await Post.findById(id)
            .populate("postedBy", "_id")
            .exec((error, post) => {
                if (error || !post) {
                    return res.status(404).json({ message: error.message });
                }
                if (post.postedBy._id.toString() === req.user._id.toString()) {
                    post.remove();
                }
            });
        res.status(200).json({ message: "Post deleted successfully." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const likePostController = async (req, res) => {
    if (req.user.role !== "renter") {
        return res.status(403).json({ message: "You are not renter" });
    }

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id: ${id}`);
    }
    try {
        const post = await Post.findById(id);
        const updatePost = await Post.findByIdAndUpdate(
            id,
            {
                $push: {
                    favorite: req.user._id,
                },
            },
            { new: true }
        );
        res.json(updatePost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const unLikePostController = async (req, res) => {
    if (req.user.role !== "renter") {
        return res.status(403).json({ message: "You are not renter" });
    }
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id: ${id}`);
    }
    try {
        const post = await Post.findById(id);
        const updatePost = await Post.findByIdAndUpdate(
            id,
            {
                $pull: {
                    favorite: req.user._id,
                },
            },
            { new: true }
        );
        res.json(updatePost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const commentPostController = async (req, res) => {
    if (req.user.role !== "renter") {
        return res.status(403).json({ message: "You are not renter" });
    }
    const { id } = req.params;

    const comments = {
        text: req.body.text,
        postedBy: req.user._id,
    };
    try {
        const updatedComment = await Post.findByIdAndUpdate(
            id,
            {
                $push: {
                    comments,
                },
            },
            { new: true }
        ).populate("commentedBy", "_id name");

        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updatePostController = async (req, res) => {
    
    if (req.user.role !== "host") {
        return res.status(403).json({ message: "You are not host" });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    try {
        const findPost = await Post.findById(id);

        if (findPost.postedBy != req.user._id) {
            res.status(403).json({ message: "you cannot update" });
        }
        const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

    res.json(updatedPost);
};
