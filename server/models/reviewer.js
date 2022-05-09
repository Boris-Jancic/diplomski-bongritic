import mongoose from 'mongoose'

const reviewerSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    jmbg:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: true
    },
    activated:{
        type: Boolean,
    },
}, {
    timestamps: true
})

export default mongoose.model('Reviewer', reviewerSchema)