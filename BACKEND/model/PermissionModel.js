const mongoose = require('mongoose');
const perModel  = new mongoose.Schema({
    title:{
        type:String,
    },
    icon:{
        type:String,
    },
    list:{
        type:Object
    },
    add:{
        type:Object
    },
    edit:{
        type:Object
    },
    view:{
        type:Object
    },
    delete:{
        type:Object
    }
})

const userPerModel = mongoose.model('permissions',perModel);
module.exports = userPerModel;