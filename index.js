const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const database = require('./config/database');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/post', postRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})