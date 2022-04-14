const mongoose = require('mongoose');



const noteSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Please give the title'],
        trim: true
    },




}, { timestamps: true });






module.exports = mongoose.model('Note', noteSchema)