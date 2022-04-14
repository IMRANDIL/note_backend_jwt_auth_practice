const router = require('express').Router();


const { getAllNote } = require('../controllers/noteController');

router.route('/').get(getAllNote).post();

router.route('/:id').get().put().delete()













module.exports = router;