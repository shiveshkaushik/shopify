const mongoose = require('mongoose');

const checkBoxModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
  permissionCheck: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      Dashboard: {
        list: false,
        add: false,
        edit: false,
        delete:false
      },
      Products: {
        list: false,
        add: false,
        edit: false,
        delete:false
      },
      Purchase: {
        list: false,
        add: false,
        edit: false,
        delete:false
      },
      UserRoles: {
        list: false,
        add: false,
        edit: false,
        delete:false
      },
      Reports:{
        list: false,
        add: false,
        edit: false,
        delete:false
      }
    }
  }
});


const checkPerModel = mongoose.model('checkbox',checkBoxModel);
module.exports = checkPerModel;