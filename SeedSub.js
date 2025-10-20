const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Subject = require("./models/SubjectsSchema");

dotenv.config({ path: './.env' });

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    await Subject.deleteMany({});
    console.log("Old subjects deleted");

    const subjects = [ 
      // Semester 1
      { subject_name: "CP", credits: 4, semester: 1, Branch:"CSE" },
      { subject_name: "DSMA", credits: 4, semester: 1, Branch:"CSE" },
      { subject_name: "OCW", credits: 4, semester: 1, Branch:"CSE" },
      { subject_name: "DLD", credits: 4, semester: 1, Branch:"CSE" },
      { subject_name: "SSHAM I", credits: 2, semester: 1, Branch:"CSE" },
      { subject_name: "SSHAM II", credits: 2, semester: 1, Branch:"CSE" },
      // Semester 2
      { subject_name: "DSA", credits: 4, semester: 2, Branch:"CSE" },
      { subject_name: "PS", credits: 4, semester: 2, Branch:"CSE" },
      { subject_name: "CA", credits: 4, semester: 2, Branch:"CSE" },
      { subject_name: "SS", credits: 4, semester: 2, Branch:"CSE" },
      { subject_name: "SSHAM III", credits: 2, semester: 2, Branch:"CSE" },
      { subject_name: "SSHAM IV", credits: 2, semester: 2, Branch:"CSE" },
      // Semester 3
      { subject_name: "ADSA", credits: 4, semester: 3, Branch:"CSE" },
      { subject_name: "OOPS", credits: 4, semester: 3, Branch:"CSE" },
      { subject_name: "DBMS", credits: 4, semester: 3, Branch:"CSE" },
      { subject_name: "RANAC", credits: 4, semester: 3, Branch:"CSE" },
      { subject_name: "OS", credits: 4, semester: 3, Branch:"CSE" },
      { subject_name: "SSHAM V", credits: 2, semester: 3, Branch:"CSE" },
      // Semester 4
      { subject_name: "CCN", credits: 4, semester: 4, Branch:"CSE" },
      { subject_name: "TOC", credits: 4, semester: 4, Branch:"CSE" },
      { subject_name: "AI", credits: 4, semester: 4, Branch:"CSE" },
      { subject_name: "FFSD", credits: 4, semester: 4, Branch:"CSE" },
      { subject_name: "SSHAM VI", credits: 2, semester: 4, Branch:"CSE" },
      { subject_name: "SSHAM VII", credits: 2, semester: 4, Branch:"CSE" },
      // Semester 5
      { subject_name: "FDFED", credits: 4, semester: 5, Branch:"CSE" },
      { subject_name: "ELECTIVE-1", credits: 3, semester: 5, Branch:"CSE" },
      { subject_name: "ELECTIVE-2", credits: 3, semester: 5, Branch:"CSE" },
      { subject_name: "ELECTIVE-3", credits: 3, semester: 5, Branch:"CSE" },
      { subject_name: "ELECTIVE-4", credits: 3, semester: 5, Branch:"CSE" },
      { subject_name: "SSHAM VIII", credits: 2, semester: 5, Branch:"CSE" },
      { subject_name: "SSHAM IX", credits: 2, semester: 5, Branch:"CSE" },
      { subject_name: "HONOURS-I", credits: 4, semester: 5, Branch:"CSE" },
      // Semester 6
      { subject_name: "WBD", credits: 4, semester: 6, Branch:"CSE" },
      { subject_name: "ELECTIVE-5", credits: 3, semester: 6, Branch:"CSE" },
      { subject_name: "ELECTIVE-6", credits: 3, semester: 6, Branch:"CSE" },
      { subject_name: "ELECTIVE-7", credits: 3, semester: 6, Branch:"CSE" },
      { subject_name: "IE-I", credits: 3, semester: 6, Branch:"CSE" },
      { subject_name: "SSHAM X", credits: 2, semester: 6, Branch:"CSE" },
      { subject_name: "BTP-I", credits: 4, semester: 6, Branch:"CSE" },
      { subject_name: "HONOURS-II", credits: 4, semester: 6, Branch:"CSE" },
      // Semester 7
      { subject_name: "ELECTIVE-8", credits: 3, semester: 7, Branch:"CSE" },
      { subject_name: "IE-II", credits: 3, semester: 7, Branch:"CSE" },
      { subject_name: "SSHAM XI", credits: 2, semester: 7, Branch:"CSE" },
      { subject_name: "BTP-II", credits: 4, semester: 7, Branch:"CSE" },
      { subject_name: "HONOURS-III", credits: 4, semester: 7, Branch:"CSE" },
      // Semester 8
      { subject_name: "ELECTIVE-9", credits: 3, semester: 8, Branch:"CSE" },
      { subject_name: "IE-III", credits: 3, semester: 8, Branch:"CSE" },
      { subject_name: "SSHAM XII", credits: 2, semester: 8, Branch:"CSE" },
      { subject_name: "HONOURS-IV", credits: 4, semester: 8, Branch:"CSE" },
//ECE
      // Semester 1
{ subject_name: "CP", credits: 4, semester: 1, Branch: "ECE" },
{ subject_name: "DSMA", credits: 4, semester: 1, Branch: "ECE" },
{ subject_name: "OCW", credits: 4, semester: 1, Branch: "ECE" },
{ subject_name: "DLD", credits: 4, semester: 1, Branch: "ECE" },
{ subject_name: "SSHAM I", credits: 2, semester: 1, Branch: "ECE" },
{ subject_name: "SSHAM II", credits: 2, semester: 1, Branch: "ECE" },

// Semester 2
{ subject_name: "PS", credits: 4, semester: 2, Branch: "ECE" },
{ subject_name: "DSA", credits: 4, semester: 2, Branch: "ECE" },
{ subject_name: "SS", credits: 4, semester: 2, Branch: "ECE" },
{ subject_name: "BEC", credits: 4, semester: 2, Branch: "ECE" },
{ subject_name: "SSHAM III", credits: 2, semester: 2, Branch: "ECE" },
{ subject_name: "SSHAM IV", credits: 2, semester: 2, Branch: "ECE" },

// Semester 3
{ subject_name: "RANAC", credits: 4, semester: 3, Branch: "ECE" },
{ subject_name: "OOP", credits: 4, semester: 3, Branch: "ECE" },
{ subject_name: "CS", credits: 4, semester: 3, Branch: "ECE" },
{ subject_name: "CNA", credits: 4, semester: 3, Branch: "ECE" },
{ subject_name: "Embedded Systems", credits: 4, semester: 3, Branch: "ECE" },
{ subject_name: "SSHAM V", credits: 2, semester: 3, Branch: "ECE" },

// Semester 4
{ subject_name: "CCN", credits: 4, semester: 4, Branch: "ECE" },
{ subject_name: "Fundamentals of Communication", credits: 4, semester: 4, Branch: "ECE" },
{ subject_name: "Analog Circuits", credits: 4, semester: 4, Branch: "ECE" },
{ subject_name: "Electromagnetics and Transmission Lines", credits: 4, semester: 4, Branch: "ECE" },
{ subject_name: "SSHAM VI", credits: 2, semester: 4, Branch: "ECE" },
{ subject_name: "SSHAM VII", credits: 2, semester: 4, Branch: "ECE" },

// Semester 5
{ subject_name: "Digital Signal Processing", credits: 4, semester: 5, Branch: "ECE" },
{ subject_name: "Introduction to VLSI", credits: 4, semester: 5, Branch: "ECE" },
{ subject_name: "Program Elective - 1", credits: 3, semester: 5, Branch: "ECE" },
{ subject_name: "Program Elective - 2", credits: 3, semester: 5, Branch: "ECE" },
{ subject_name: "Program Elective - 3", credits: 3, semester: 5, Branch: "ECE" },
{ subject_name: "SSHAM VIII", credits: 2, semester: 5, Branch: "ECE" },
{ subject_name: "SSHAM IX", credits: 2, semester: 5, Branch: "ECE" },
{ subject_name: "HONOURS-I", credits: 4, semester: 5, Branch:"ECE" },
// Semester 6
{ subject_name: "Program Elective - 4", credits: 3, semester: 6, Branch: "ECE" },
{ subject_name: "Program Elective - 5", credits: 3, semester: 6, Branch: "ECE" },
{ subject_name: "Program Elective - 6", credits: 3, semester: 6, Branch: "ECE" },
{ subject_name: "Program Elective - 7", credits: 3, semester: 6, Branch: "ECE" },
{ subject_name: "Institute Elective - 1", credits: 3, semester: 6, Branch: "ECE" },
{ subject_name: "SSHAM X", credits: 2, semester: 6, Branch: "ECE" },
{ subject_name: "BTP-I", credits: 4, semester: 6, Branch:"ECE" },
{ subject_name: "HONOURS-II", credits: 4, semester: 6, Branch:"ECE" },
// Semester 7
{ subject_name: "Program Elective - 8", credits: 3, semester: 7, Branch: "ECE" },
{ subject_name: "Institute Elective - 2", credits: 3, semester: 7, Branch: "ECE" },
{ subject_name: "SSHAM XI", credits: 2, semester: 7, Branch: "ECE" },
{ subject_name: "BTP-II", credits: 4, semester: 7, Branch:"ECE" },
{ subject_name: "HONOURS-III", credits: 4, semester: 7, Branch:"ECE" },
// Semester 8
{ subject_name: "Program Elective - 9", credits: 3, semester: 8, Branch: "ECE" },
{ subject_name: "Institute Elective - 3", credits: 3, semester: 8, Branch: "ECE" },
{ subject_name: "SSHAM XII", credits: 2, semester: 8, Branch: "ECE" },
{ subject_name: "HONOURS-IV", credits: 4, semester: 8, Branch:"ECE" },
//AIDS
// Semester 1
{ subject_name: "CP", credits: 4, semester: 1, Branch: "AIDS" },
{ subject_name: "DSMA", credits: 4, semester: 1, Branch: "AIDS" },
{ subject_name: "OCW", credits: 4, semester: 1, Branch: "AIDS" },
{ subject_name: "DLD", credits: 4, semester: 1, Branch: "AIDS" },
{ subject_name: "SSHAM I", credits: 2, semester: 1, Branch: "AIDS" },
{ subject_name: "SSHAM II", credits: 2, semester: 1, Branch: "AIDS" },

// Semester 2
{ subject_name: "PS", credits: 4, semester: 2, Branch: "AIDS" },
{ subject_name: "DSA", credits: 4, semester: 2, Branch: "AIDS" },
{ subject_name: "SS", credits: 4, semester: 2, Branch: "AIDS" },
{ subject_name: "CA", credits: 4, semester: 2, Branch: "AIDS" },
{ subject_name: "SSHAM III", credits: 2, semester: 2, Branch: "AIDS" },
{ subject_name: "SSHAM IV", credits: 2, semester: 2, Branch: "AIDS" },

// Semester 3
{ subject_name: "RANAC", credits: 4, semester: 3, Branch: "AIDS" },
{ subject_name: "OOP", credits: 4, semester: 3, Branch: "AIDS" },
{ subject_name: "ADSA", credits: 4, semester: 3, Branch: "AIDS" },
{ subject_name: "DBMS", credits: 4, semester: 3, Branch: "AIDS" },
{ subject_name: "ML", credits: 3, semester: 3, Branch: "AIDS" },
{ subject_name: "Seminar", credits: 1, semester: 3, Branch: "AIDS" },
{ subject_name: "SSHAM V", credits: 2, semester: 3, Branch: "AIDS" },

// Semester 4
{ subject_name: "CCN", credits: 4, semester: 4, Branch: "AIDS" },
{ subject_name: "DL", credits: 4, semester: 4, Branch: "AIDS" },
{ subject_name: "IDA", credits: 4, semester: 4, Branch: "AIDS" },
{ subject_name: "AIKR", credits: 4, semester: 4, Branch: "AIDS" },
{ subject_name: "SSHAM VI", credits: 2, semester: 4, Branch: "AIDS" },
{ subject_name: "SSHAM VII", credits: 2, semester: 4, Branch: "AIDS" },

// Semester 5
{ subject_name: "OS", credits: 4, semester: 5, Branch: "AIDS" },
{ subject_name: "PDS", credits: 4, semester: 5, Branch: "AIDS" },
{ subject_name: "Program Elective - 1", credits: 3, semester: 5, Branch: "AIDS" },
{ subject_name: "Program Elective - 2", credits: 3, semester: 5, Branch: "AIDS" },
{ subject_name: "Program Elective - 3", credits: 3, semester: 5, Branch: "AIDS" },
{ subject_name: "SSHAM VIII", credits: 2, semester: 5, Branch: "AIDS" },
{ subject_name: "SSHAM IX", credits: 2, semester: 5, Branch: "AIDS" },
{ subject_name: "HONOURS-I", credits: 4, semester: 5, Branch:"AIDS" },
// Semester 6
{ subject_name: "Program Elective - 4", credits: 3, semester: 6, Branch: "AIDS" },
{ subject_name: "Program Elective - 5", credits: 3, semester: 6, Branch: "AIDS" },
{ subject_name: "Program Elective - 6", credits: 3, semester: 6, Branch: "AIDS" },
{ subject_name: "Program Elective - 7", credits: 3, semester: 6, Branch: "AIDS" },
{ subject_name: "Institute Elective - 1", credits: 3, semester: 6, Branch: "AIDS" },
{ subject_name: "SSHAM X", credits: 2, semester: 6, Branch: "AIDS" },
{ subject_name: "BTP-I", credits: 4, semester: 6, Branch:"AIDS" },
{ subject_name: "HONOURS-II", credits: 4, semester: 6, Branch:"AIDS" },
// Semester 7
{ subject_name: "Program Elective - 8", credits: 3, semester: 7, Branch: "AIDS" },
{ subject_name: "Institute Elective - 2", credits: 3, semester: 7, Branch: "AIDS" },
{ subject_name: "SSHAM XI", credits: 2, semester: 7, Branch: "AIDS" },
{ subject_name: "BTP-II", credits: 4, semester: 7, Branch:"AIDS" },
{ subject_name: "HONOURS-III", credits: 4, semester: 7, Branch:"AIDS" },
// Semester 8
{ subject_name: "Program Elective - 9", credits: 3, semester: 8, Branch: "AIDS" },
{ subject_name: "Institute Elective - 3", credits: 3, semester: 8, Branch: "AIDS" },
{ subject_name: "SSHAM XII", credits: 2, semester: 8, Branch: "AIDS" },
{ subject_name: "HONOURS-IV", credits: 4, semester: 8, Branch:"AIDS" },

    ];

    await Subject.insertMany(subjects);
    console.log("Subjects seeded successfully!");
    process.exit();
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });
