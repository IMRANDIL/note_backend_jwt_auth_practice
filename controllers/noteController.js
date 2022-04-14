//import note model ........
const Note = require('../models/noteModel')

const asyncHandler = require('express-async-handler')


//get all notes controller......

exports.getAllNote = asyncHandler(async (req, res, next) => {

    //get all note from daatabase....

    const notes = await Note.find({});

    //check if there is any note or not....

    if (notes.length === 0) {
        res.status(404);
        throw new Error('No notes found!')
    }

    //now send the response....if it has notes....

    res.status(200).json(notes)


})