const mongoose = require("mongoose")
const {Schema} = mongoose


const Userschema = new Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    date : {
        type: Date,
    },

})

const User = mongoose.model('user' , Userschema)
module.exports = User