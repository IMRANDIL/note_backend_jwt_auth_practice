const router = require('express').Router();


const { getAllNote, createNote } = require('../controllers/noteController');

const protectRoute = require('../middlewares/protectAuth')




router.route('/').get(protectRoute, getAllNote).post(protectRoute, createNote);

router.route('/:id').get().put().delete()













module.exports = router;