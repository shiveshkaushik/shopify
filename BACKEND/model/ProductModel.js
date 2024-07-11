const mongoose = require('mongoose')

const prodSchema = new mongoose.Schema({
    id: {
        type: Number,
        default:25
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default:''
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        rate: { type: Number,default:0 },
        count: { type: Number,default:0 }
    }
})

const productModel = mongoose.model('products',prodSchema)
module.exports = productModel
