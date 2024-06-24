const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required : true,
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
    },
    superAdmin:{
        type:Boolean,
        default:false,
        required:true
    },
    roleAccess:{
        type:[String],
        default:[],
        required:true
    },
    role:{
        type:String,
        default:'no',
    } ,
    image:{
        type:String,
        default:'default'
    },
    imageFlag:{
        type:Boolean,
        default:false
    },
    imageUrl:{
        type:String,
        default:''
    }  
});

const register = mongoose.model('users',registrationSchema);
module.exports = register;
