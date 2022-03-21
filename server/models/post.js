import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    selectedFile: {
        type: String,
        required: true,
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