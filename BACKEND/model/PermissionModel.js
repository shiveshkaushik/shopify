const mongoose = require('mongoose');
const perModel  = new mongoose.Schema({
    name:{
        type:String,
        default:'no',
        required:true,
    },
    roleAccess:{
        type:[String],
        default:[],
        required:true
    },
})

const userPerModel = mongoose.model('permissions',perModel);
module.exports = userPerModel;