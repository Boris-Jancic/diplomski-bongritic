import Post from '../models/post.js'

export const getPosts = async (req, res) => { 
    const { page = 1, limit = 10 } = req.query
    try {
        const count = await Post.countDocuments()
        const posts = await Post.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({"createdAt": -1})

        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            posts: posts
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getLatestPost = async (req, res) => { 
    try {
        const post = await Post.findOne().sort({"createdAt": -1}) 
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const newPost = new Post(req.body)
    try {
        newPost.save()
        res.status(201).send(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}