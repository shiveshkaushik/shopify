const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const loginModel = new mongoose.Schema({
    userId:{
        type:ObjectId,
        required:true
    },
    email: {
        type: String,
        required: true,
    },
    loginTime: {
        type: Number,
        default: Date.now,
        required: true
    },
    actions:{
        type: [String],
        default: [],
        required:true
    }
});

const logModel = mongoose.model('log',loginModel);

module.exports = logModel;