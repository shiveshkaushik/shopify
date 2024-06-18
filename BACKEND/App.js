const express = require('express');
const app = express();
const port = 3000;
const myRouter = require('./routes/AuthRoute');
const {connectDB }= require('./db/Connect');
const bodyParser = require('body-parser');
require('dotenv').config();
const loginDB = process.env.MONGO_URI;
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use('/', myRouter);

const start = async () => {
    try {
        await connectDB(loginDB);
        console.log('DB connected');
        app.listen(port, console.log(`Server Active: ${port}`));
    } catch (err) {
        console.log(err);
    }
};

start();
