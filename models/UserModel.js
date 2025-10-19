const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  RollNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  path: { type: String, enum: ["btp", "honours"], default: null }, 
  semesters: [
    {
      semester: { type: Number, required: true, min:1, max:10 },
      grades: [
        {
          subject_code: String,
          grade: String,
          enum: ["O","A","B","C","D","P","F"]    
        }
      ],
      sgpa: {type: Number, min: 0, max:10}
    }
  ],
  cgpa: {type: Number, min: 0, max:10}
});

module.exports = mongoose.model("User", userSchema);
