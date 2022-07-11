import Post from '../models/post.js'
import mongoose from 'mongoose'
import mailToClient from '../service/mailer.js'

export const getPosts = async (req, res) => { 
    const { page = 1, limit = 1, createdAt = -1 } = req.query
    try {
        const count = await Post.countDocuments()
        const posts = await Post.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({"createdAt": createdAt})

        return res.status(200).json({
            currentPage: Math.ceil(page),
            totalPages: Math.ceil(count / limit),
            posts: posts
        });
    } catch (error) {
        return res.status(404).json({ message: error.message });
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
        return res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            posts: post
        });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const getLatestPost = async (req, res) => { 
    try {
        const post = await Post.findOne().sort({"createdAt": -1}) 
        return res.status(200).json(post);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.query
    try {
        const post = await Post.findById(id) 

        post.reviewerComments = post.reviewerComments.filter(comment => comment.approved)

        return res.status(200).json(post);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const comment = {
        game: req.body.comment.game,
        author: req.body.comment.author,
        authorEmail: req.body.comment.authorEmail,
        title: req.body.comment.title,
        avatar: req.body.comment.avatar,
        text: req.body.comment.text,
        grade: req.body.comment.grade,
        screenshots: req.body.comment.screenshots,
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
        return res.status(201).send(newPost)
    } catch (error) {
        return res.status(409).json({message: error.message})
    }
}

export const createUserComment = async (req, res) => {
    const comment = {
        author: req.body.author,
        text: req.body.text,
        grade: req.body.grade,
        date: new Date().toLocaleDateString(), 
        reported: false
    }
    const { gameId } = req.body 
    try {
        const existingPost = await Post.findOne({'game.id': gameId}).exec()

        if (existingPost.userComments.filter(com => com.author === comment.author).length > 0)
            return res.status(409).json({messages:['You have already submited a review for this game']})

        comment.game = existingPost.game.name
        existingPost.userComments.push(comment)
        existingPost.save()
        
        return res.status(201).send(comment)
    } catch (error) {
        return res.status(409).json({message: error.message})
    }
}

export const reportUserComment = async (req, res) => {
    try {
        const comment  = req.body
        const existingPost = await Post.findOne({'game.name': comment.game}).exec()
        const existingComment = existingPost.userComments.filter(item => String(item._id) === comment._id) 
        
        if (existingComment[0].reported === true)
            return res.status(409).json({messages:['This comment has already been reported, the admin will see to it quickly.']})
    
        existingPost.userComments.filter(item => item.reported = true) 
        existingPost.save()
        return res.status(201).send("You have successfully reported this comment, the admin will see to it quickly")
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
                                $eq: [ "$$comment.authorEmail", email ],
                                $eq: [ "$$comment.approved", true ]
                            }
                        }
                    },
                }}
        ])
        .exec()
        return res.status(200).json(post);
    } catch (error) {
        console.log(error.message)
        return res.status(404).json({ message: error.message });
    }
}

export const getUserComments = async (req, res) => { 
    const { username } = req.query
    try {
        const post = await Post.aggregate([
            { $match: { userComments :{"$elemMatch":{author: username}} } },
            {
                $project : {
                    userComments: {
                        $filter: {
                            input: "$userComments",
                            as: "comment",
                            cond: {
                                $eq: [ "$$comment.author", username ]
                            }
                        }
                    },
                }
            }
        ])
        .exec()
        return res.status(200).json(post);
    } catch (error) {
        console.log(error.message)
        return res.status(404).json({ message: error.message });
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
        return res.status(200).json(grades[0]);
    } catch (error) {
        return res.status(404).json({ message: error.message });
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
        return res.status(200).json(grades[0]);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const updateCommentStatus = async (req, res) => {
    const data = req.body
    try {
        const post = await Post.findOne({'game.name': data.game}).exec()
        const filteredComments = []
        if (data.approved) {
            post.reviewerComments.forEach(comment => {
                if (comment === data.commentId) comment.approved = true, filteredComments.push(comment)
            })
            post.reviewerComments.splice(0, post.reviewerComments.length)
            post.reviewerComments = filteredComments
            post.save()
            return res.status(200).json({'message': 'Successfully approved comment'});
        } else {
            post.reviewerComments.forEach(comment => {
                if (comment !== data.commentId) filteredComments.push(comment)
            })
            post.reviewerComments.splice(0, post.reviewerComments.length)
            post.reviewerComments = filteredComments
            post.save()
            mailToClient(data.email, 'Regarding a comment you made', data.answer)
            return res.status(200).json({'message': 'Successfully denied comment'});
        }
    } catch (error) {
        console.log( error.message )
        return res.status(404).json({ message: error.message });
    }
}

export const getNotApprovedComments = async (req, res) => {
    try {
        const posts = await Post.aggregate([
            {
                $project : {
                    reviewerComments: {
                        $filter: {
                            input: "$reviewerComments",
                            as: "comment",
                            cond: {
                                $eq: [ "$$comment.approved", false ]
                            }
                        }
                    },
                },
            },
            { $unset: ["_id"] }
        ])
        .exec()

        const notApprovedComment = []

        posts.forEach(item => item.reviewerComments.length > 0 && notApprovedComment.push(item.reviewerComments[0]))

        return res.status(200).json(notApprovedComment);
    } catch (error) {
        console.log( error.message )
        return res.status(404).json({ message: error.message });
    }
}