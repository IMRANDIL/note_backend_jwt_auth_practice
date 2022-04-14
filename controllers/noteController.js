//import note model ........
const Note = require('../models/noteModel')

const asyncHandler = require('express-async-handler')


//get all notes controller......

exports.getAllNote = asyncHandler(async (req, res, next) => {

    //get all note from daatabase....

    const notes = await Note.find({});

    if (!notes) {
        res.status(404);
        throw new Error('No notes found!')
    }

    res.status(200).json(notes)


})