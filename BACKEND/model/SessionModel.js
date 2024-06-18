const mongoose = require('mongoose');

const sessionModel = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    token:{
        type: String,
        required: true
    },
    createdAt:{
        type:Number,
        default:Date.now,
        required:true
    },
    updatedAt:{
        type:Number,
        default:Date.now,
        required:true
    }
})

const sesModel = mongoose.model('session',sessionModel);

module.exports = sesModel;