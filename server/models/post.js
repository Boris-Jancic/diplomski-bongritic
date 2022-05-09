import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        email: {
            type:String,
            required: true,
        },
        name: {
            type:String,
            required: true,
        },
        avatar: {
            type:String,
            required: true,
        }
    },
    text: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    game: {
    },
    comments: [
        {
            author: String,
            text: String,
            grade: Number
        }
    ]
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export default Post