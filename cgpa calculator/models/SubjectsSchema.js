const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subject_name: { type: String, required: true },
  credits: { type: Number, required: true },
  semester: { type: Number, required: true }
});

module.exports = mongoose.model("Subject", subjectSchema);
