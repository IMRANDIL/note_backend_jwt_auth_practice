require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');


const app = express();

const errorHandler = require('./middlewares/errorMiddleware');
const userRoute = require('./routers/userRouter');
const noteRoute = require('./routers/noteRouter');

//middleware....

app.use(express.json());
app.use(express.urlencoded({ extended: true }))



//route middlewares.....


app.use('/users', userRoute)

app.use('/api/notes', noteRoute)







//error handling.....

app.use(errorHandler)






const PORT = process.env.PORT || 3000;









//server setup and database connection setup....

mongoose.connect(process.env.URI).then(() => {
    console.log('database connnected😃');
    app.listen(PORT, () => {
        console.log(`server runs on port: ${PORT}`);
    })
}).catch((err) => {
    console.log(err);
    process.exit(1)
})