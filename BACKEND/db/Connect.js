const mongoose = require('mongoose');

const connectDB = (mongo) => {
    return mongoose.connect(mongo);
}

module.exports = {connectDB};
