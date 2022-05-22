import Post from '../models/post.js'
import mongoose from 'mongoose'

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

export const getPost = async (req, res) => { 
    const { id } = req.query
    const { authorization } = req.headers 
    if (authorization !== "REVIEWER") res.status(403).json({ message: error.message });
    try {
        const post = await Post.findById(id) 
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { authorization } = req.headers 
    if (authorization !== "REVIEWER") res.status(403).json({ message: error.message });
    const comment = {
        author: req.body.comment.author,
        authorEmail: req.body.comment.authorEmail,
        title: req.body.comment.title,
        avatar: req.body.comment.avatar,
        text: req.body.comment.text,
        grade: req.body.comment.grade,
        date: new Date().toLocaleDateString(),
        approved: false
    }
    try {
        if (await Post.exists({'game.id': req.body.game.id}).exec() !== null) {        
            const existingPost = await Post.findOne({'game.id': req.body.game.id}).exec()
            if (await Post.exists({'reviewerComments':{"$elemMatch":{author: comment.author}}}).exec() !== null)
                return res.status(409).json({message: 'You have already submited a review for this game'})
            existingPost.reviewerComments.push(comment)
            existingPost.save()
            res.status(201).send(existingPost)
        }
        const newPost = new Post()
        newPost.reviewerComments.push(comment)
        newPost.game = req.body.game
        newPost.save()
        res.status(201).send(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const getReviewerComments = async (req, res) => { 
    const { email } = req.query
    try {
        const post = await Post
        .find({'reviewerComments':{"$elemMatch":{authorEmail: email}}}) // returns wrong comments, fix this
        .select('reviewerComments') // returns the first comment of a array, this could be the wrong author
        .exec()
        console.log(post)
        res.status(200).json(post);
    } catch (error) {
        console.log(error.message)
        res.status(404).json({ message: error.message });
    }
}

export const getAverageGrades = async (req, res) => {
    const { id } = req.query
    try {
        const post = await Post.aggregate([
            {
                $match:
                    {
                        _id: mongoose.Types.ObjectId(`${id}`)
                    }
            },
            {
                $unwind: "$reviewerComments"
            },
            {
                $group:{
                    _id:{
                        "comment_id": "$reviewerComments.id",
                        "title": "$reviewerComments.title",
                        "grade": "$reviewerComments.grade",
                    },
                    avg_rating: {$avg:"reviewerComments.grade"}
                }
            },
            {
                $project:{
                    "id": "$_id.rating_id",
                    "title": "$_id.title",
                    "avg_rating": "$avg_rating"  // avg_rating returns null, fix this
                }
            }
        ])
        res.status(200).json(post);
    } catch (error) {
        console.log(error.message)
        res.status(404).json({ message: error.message });
    }
}