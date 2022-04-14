const router = require('express').Router();


const { getAllNote, createNote, deleteSpecNote, updateSpecNote, getSpecNote } = require('../controllers/noteController');

const protectRoute = require('../middlewares/protectAuth')




router.route('/').get(protectRoute, getAllNote).post(protectRoute, createNote);

router.route('/:id').get(protectRoute, getSpecNote).put(protectRoute, updateSpecNote).delete(protectRoute, deleteSpecNote)













module.exports = router;