const mongoose = require('mongoose');

const prodModel = new mongoose.Schema({
    name:{
        type:String,
    },
    price:{
        type:Number
    },
    desc:{
        type:String
    }
})

const productModel = mongoose.model('products',prodModel);
module.exports = productModel;
