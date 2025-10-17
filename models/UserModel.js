const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  RollNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  path: { type: String, enum: ["btp", "honours"], default: null }, 
  semesters: [
    {
      semester: { type: Number, required: true },
      grades: [
        {
          subject_code: String,
          grade: String          
        }
      ],
      sgpa: Number
    }
  ],
  cgpa: Number
});

module.exports = mongoose.model("User", userSchema);
