//import the User model...here....

const User = require('../models/userModel')

const bcrypt = require('bcrypt');


const jwt = require('jsonwebtoken')

const asyncHandler = require('express-async-handler');


//Register Controller......


exports.registerUser = asyncHandler(async (req, res, next) => {

    //extract the data from the req.body....

    const { username, email, password } = req.body;

    //some validation...

    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields')
    }


    //now check if user already exists....

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
        res.status(400);
        throw new Error('User already exists')
    }


    //now no user is already registered ...it is time to hash the password....

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //now it  is time to create User.....


    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });


    if (user) {
        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error('something went wrong')
    }



})






//login.....



exports.loginUser = asyncHandler(async (req, res, next) => {

    //extract the data from the req.body......

    const { email, password } = req.body;


    //some validation again...

    if (!email || !password) {
        res.status(400);
        throw new Error('Please fill all the fields')
    }



    //now fetch the particular user data from the database....

    const user = await User.findOne({ email });


    //now check for user...

    if (!user) {
        res.status(400);
        throw new Error('User does not exist')
    }


    //if there is user....now compare the password....

    const isMatchPass = await bcrypt.compare(password, user.password);

    if (!isMatchPass) {
        res.status(400);
        throw new Error('Invalid Credentials')
    }




    //now create a jwt token....
    const payload = { id: user._id, name: user.username }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5d' })





    //now password matched with the database password...now  send the  response....


    res.status(200).json({
        id: user._id,
        email: user.email,
        username: user.username,
        jsonwebtoken: token
    })


})