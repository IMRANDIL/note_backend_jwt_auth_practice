const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Please fill the userName'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please fill the Email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please fill the password']
    }



}, { timestamps: true });



module.exports = mongoose.model('User', userSchema)