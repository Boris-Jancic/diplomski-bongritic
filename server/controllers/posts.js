import mongoose from 'mongoose'
import Post from '../models/post.js'

export const getPosts = async (req, res) => { 
    try {
        const posts = await Post.find();
        console.log("Getting posts")
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new Post(post)
    console.log("Creating a post")
    try {
        newPost.save()
        res.status(201).send(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}