const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  doseAmount: {
  type: Number
},

doseUnit: {
  type: String
},

  frequency: {
    type: String
  },

  time: {
    type: String
  },
  
 daysLeft: {
  type: Number,
  default: 0
},
  status: {
    type: String,
    default: "pending"
  },

  lastReminder: {
  type: Date,
  default: null
},

  reminder: {
    type: Boolean,
    default: true
  },

  token: {
    type: String
  },

  // 🔥 VERY IMPORTANT (THIS FIXES YOUR BUG)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Medicine", medicineSchema);