import mongoose from 'mongoose'

const clientSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    activated:{
        type: Boolean,
    },
}, {
    timestamps: true
})

const Client = mongoose.model('Client', clientSchema)

export default Client