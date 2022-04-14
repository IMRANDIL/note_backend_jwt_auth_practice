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


    res.status(201).json({ msg: 'Note created' })


});



//deletes note now...specific one....



exports.deleteSpecNote = asyncHandler(async (req, res, next) => {
    //extract the note id from the params....

    const { id } = req.params;

    //now find the note in the database...

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
        res.status(400);
        throw new Error('Note not found');
    }

    //now ....send the response...

    res.status(200).json({ msg: 'Note deleted' })





});



//update the specific note.....


exports.updateSpecNote = asyncHandler(async (req, res, next) => {
    //extract the id from the params...


    const { id } = req.params;

    const { title, content, date } = req.body;



    //now update the note....

    await Note.findOneAndUpdate({ _id: id }, {
        title,
        content,
        date
    })

    res.status(200).json({ msg: 'Note Updated' })

});



//get Specific note......




exports.getSpecNote = asyncHandler(async (req, res, next) => {
    //extract the id from the params.....


    const { id } = req.params;


    const note = await Note.findById(id);

    if (!note) {
        res.status(400);
        throw new Error('No note found')
    }


    res.status(200).json(note)
})