import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    game: {
    },
    reviewerComments: [
        {
            author: String,
            authorEmail: String,
            avatar: String,
            title: String,
            text: String,
            grade: Number,
            date: String
        }
    ],
    userComments: [
        {
            author: String,
            authorEmail: String,
            text: String,
            grade: Number,
            date: String
        }
    ]
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export default Post