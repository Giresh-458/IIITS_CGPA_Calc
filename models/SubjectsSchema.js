const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subject_name: { type: String, required: true },
  credits: { type: Number, required: true },
  semester: { type: Number, required: true, min:1,max:8 },
  Branch: {type: String, enum: ["CSE", "ECE", "AIDS"], default: null}

});

module.exports = mongoose.model("Subject", subjectSchema);
