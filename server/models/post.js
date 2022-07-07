import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    game: {
    },
    reviewerComments: [
        {
            author: String,
            authorEmail: String,
            avatar: String,
            game: String,
            title: String,
            text: String,
            grade: Number,
            date: String,
            approved: Boolean,
            screenshots: [{
                type: String
            }]
        }
    ],
    userComments: [
        {
            game: String,
            author: String,
            authorEmail: String,
            text: String,
            grade: Number,
            date: String,
            reported: Boolean
        }
    ]
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export default Post