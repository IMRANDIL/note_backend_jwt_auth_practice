const router = require('express').Router();
const { registerUser, loginUser, getMe } = require('../controllers/userController');

const protectRoute = require('../middlewares/protectAuth')

//Register User......


router.post('/register', registerUser);


router.post('/login', loginUser);


//get the user info after verifying by our middleware...protectroute...


router.get('/me', protectRoute, getMe)







module.exports = router;