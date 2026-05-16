const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },

  email: {
    type: String,
    required: true,
    unique: true
  },
  
  mobile: {
  type: String,
  default: ""
},

  password: {
    type: String,
    required: true
  },

  dob: {
    type: String,
    default: ""
  },

  gender: {
    type: String,
    default: ""
  },

  blood: {
    type: String,
    default: ""
  },

  height: {
    type: String,
    default: ""
  },

  weight: {
    type: String,
    default: ""
  },

  disease: {
    type: String,
    default: ""
  }

});

module.exports = mongoose.model("User", UserSchema);