const jwt = require('jsonwebtoken');








const protectRoute = (req, res, next) => {

    try {
        //check for the header if it has the token  or  not........

        const token = req.header('Authorization');

        if (!token) return res.status(400).json({ msg: 'You are not authorized' });


        //now verify the token....


        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: 'Authorization failed' });

            //now set the user to the req object.....

            req.user = user;

            next()
        })




    } catch (error) {
        return res.status(500).json({ msg: error.messaage })
    }

}




module.exports = protectRoute;