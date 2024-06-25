const mongoose = require('mongoose');

const pageModel = new mongoose.Schema({
    role:{
        type:String,
        required:true,
    },
    permission:{
        type:Array,
        required:true,
        default:[],
    },
    editMode:{
        type:Boolean,
        default:false
    }
})

const pagePermissionModel = mongoose.model('roles',pageModel);
module.exports = pagePermissionModel;