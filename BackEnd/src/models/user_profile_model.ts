import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    imageUrl:{
        type: String
    },
    email:{
        type: String,
        required: true
    }
})

export = mongoose.model('Profile',profileSchema)