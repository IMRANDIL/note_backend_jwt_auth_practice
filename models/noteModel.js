const mongoose = require('mongoose');



const noteSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Please give the title'],

    },
    content: {
        type: String,
        required: [true, 'Please give the content'],

    },
    date: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }




}, { timestamps: true });






module.exports = mongoose.model('Note', noteSchema)