import Post from '../models/post.js'
import mongoose from 'mongoose'

export const getPosts = async (req, res) => { 
    const { page = 1, limit = 1, createdAt = -1 } = req.query
    try {
        const count = await Post.countDocuments()
        const posts = await Post.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({"createdAt": createdAt})

        res.status(200).json({
            currentPage: Math.ceil(page),
            totalPages: Math.ceil(count / limit),
            posts: posts
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

export const getPostByGameName = async (req, res) => {  
    const { page = 1, limit = 10, gameName = '' } = req.query
    try {
        const regex = new RegExp(escapeRegex(gameName), 'gi');
        const count = await Post.countDocuments()
        const post = await Post.find({'game.name': regex})
        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            posts: post
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

export const createUserComment = async (req, res) => {
    const comment = {
        author: req.body.author,
        text: req.body.text,
        grade: req.body.grade,
        date: new Date().toLocaleDateString(),
    }
    const { gameId } = req.body 
    try {
        const existingPost = await Post.findOne({'game.id': gameId}).exec()

        if (existingPost.userComments.filter(com => com.author === comment.author).length > 0)
            return res.status(409).json({messages:['You have already submited a review for this game']})

        existingPost.userComments.push(comment)
        existingPost.save()
        
        return res.status(201).send(comment)
    } catch (error) {
        return res.status(409).json({message: error.message})
    }
}

export const getReviewerComments = async (req, res) => { 
    const { email } = req.query
    try {
        const post = await Post.aggregate([
            { $match: { reviewerComments :{"$elemMatch":{authorEmail: email}} } },
            {
                $project : {
                    reviewerComments: {
                        $filter: {
                            input: "$reviewerComments",
                            as: "comment",
                            cond: {
                                $eq: [ "$$comment.authorEmail", email ]
                            }
                        }
                    },
                }}
        ])
        .exec()
        res.status(200).json(post);
    } catch (error) {
        console.log(error.message)
        res.status(404).json({ message: error.message });
    }
}

export const getAverageGradesReviewer = async (req, res) => {
    const { id } = req.query
    try {
        const grades = await Post.aggregate([
            {
                $match:{
                    _id: mongoose.Types.ObjectId(`${id}`)
                }
            },
            {
                $unwind: "$reviewerComments"
            },
            {
                $group:{
                    _id: "$_id",
                    criticGrade: { $avg: "$reviewerComments.grade"},
                }
            }
        ])
        res.status(200).json(grades[0]);
    } catch (error) {
        console.log(error.message)
        res.status(404).json({ message: error.message });
    }
}

export const getAverageGradesUser = async (req, res) => {
    const { id } = req.query
    try {
        const grades = await Post.aggregate([
            {
                $match:{
                    _id: mongoose.Types.ObjectId(`${id}`)
                }
            },
            {
                $unwind: "$userComments"
            },
            {
                $group:{
                    _id: "$_id",
                    userGrade: { $avg: "$userComments.grade"},
                }
            }
        ])
        res.status(200).json(grades[0]);
    } catch (error) {
        console.log(error.message)
        res.status(404).json({ message: error.message });
    }
}