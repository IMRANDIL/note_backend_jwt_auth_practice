//import note model ........
const Note = require('../models/noteModel')

const asyncHandler = require('express-async-handler')








//get all notes controller......

exports.getAllNote = asyncHandler(async (req, res, next) => {

    //get all note from daatabase....

    const notes = await Note.find({ user_id: req.user.id });

    //check if there is any note or not....

    if (notes.length === 0) {
        res.status(404);
        throw new Error('No notes found!')
    }

    //now send the response....if it has notes....

    res.status(200).json(notes)


});



//create notes now......controller....


exports.createNote = asyncHandler(async (req, res, next) => {

    //extract data from the req.body...

    const { title, content, date } = req.body;

    //some validation....

    if (!title || !content) {
        res.status(400);
        throw new Error('Please fill the Title and Content')
    }



    //now create the note....

    const note = await Note.create({
        title: title,
        content: content,
        date,
        user_id: req.user.id,
        name: req.user.name
    });


    res.status(201).json(note)


})