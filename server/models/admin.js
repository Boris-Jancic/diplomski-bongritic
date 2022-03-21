import mongoose from 'mongoose'

const adminSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    secondName:{
        type: String,
    },
    jmbg: {
        type: String,
        required: true,
        unique:true
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
}, {
    timestamps: true
})

const client = mongoose.model('client', adminSchema)

export default client