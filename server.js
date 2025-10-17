const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const mongoose = require("mongoose")
const session = require("express-session")
const bcrypt=require("bcrypt")
const User = require("./models/UserModel")
const Subject = require("./models/SubjectsSchema");

const app = express()
const PORT= 3000

app.use(express.json());
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
  secret: "GLV_458_", 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://127.0.0.1:27017/CGPA-IIITS(CSE)")
  .then(async () => {
    console.log("Connected to MongoDB");

    const count = await Subject.countDocuments();
    if (count === 0) {
      const subjects = [ 
      { subject_name: "CP", credits: 4, semester: 1 },
      { subject_name: "DSMA", credits: 4, semester: 1 },
      { subject_name: "OCW", credits: 4, semester: 1 },
      { subject_name: "DLD", credits: 4, semester: 1 },
      { subject_name: "EE/EEN", credits: 2, semester: 1 },
      { subject_name: "FHVE", credits: 2, semester: 1 },

      // Semester 2
      { subject_name: "DSA", credits: 4, semester: 2 },
      { subject_name: "PS", credits: 4, semester: 2 },
      { subject_name: "CA", credits: 4, semester: 2 },
      { subject_name: "SS", credits: 4, semester: 2 },
      { subject_name: "OPC", credits: 2, semester: 2 },
      { subject_name: "EEN/CCI", credits: 2, semester: 2 },

      // Semester 3
      { subject_name: "ADSA", credits: 4, semester: 3 },
      { subject_name: "OOPS", credits: 4, semester: 3 },
      { subject_name: "DBMS", credits: 4, semester: 3 },
      { subject_name: "RANAC", credits: 4, semester: 3 },
      { subject_name: "OS", credits: 4, semester: 3 },
      { subject_name: "PC", credits: 2, semester: 3 },
      

      // Semester 4
      { subject_name: "CCN", credits: 4, semester: 4 },
      { subject_name: "TOC", credits: 4, semester: 4 },
      { subject_name: "AI", credits: 4, semester: 4 },
      { subject_name: "FFSD", credits: 4, semester: 4 },
      { subject_name: "ACS", credits: 2, semester: 4 },
      { subject_name: "SSHAM-I", credits: 2, semester: 4 },

      // Semester 5
      { subject_name: "FDFED", credits: 4, semester: 5 },
      { subject_name: "ELECTIVE-1", credits: 3, semester: 5 },
      { subject_name: "ELECTIVE-2", credits: 3, semester: 5 },
      { subject_name: "ELECTIVE-3", credits: 3, semester: 5 },
      { subject_name: "ELECTIVE-4", credits: 3, semester: 5 },
      { subject_name: "SSHAM-II", credits: 2, semester: 5 },
      { subject_name: "QRA", credits: 2, semester: 5 },

      // Semester 6
      { subject_name: "WBD", credits: 4, semester: 6 },
      { subject_name: "ELECTIVE-5", credits: 3, semester: 6 },
      { subject_name: "ELECTIVE-6", credits: 3, semester: 6 },
      { subject_name: "ELECTIVE-7", credits: 3, semester: 6 },
      { subject_name: "IE-I", credits: 2, semester: 6 },
      { subject_name: "SSHAM-III", credits: 2, semester: 6 },
      { subject_name: "BTP-I", credits: 4, semester: 6 },
      // Semester 7
      { subject_name: "ELECTIVE-8", credits: 3, semester: 7 },
      { subject_name: "IE-II", credits: 3, semester: 7 },
      { subject_name: "SSHAM-IV", credits: 2, semester: 7 },
      { subject_name: "BTP-II", credits: 4, semester: 7 },
      // Semester 8
      { subject_name: "ELECTIVE-9", credits: 3, semester: 8 },
      { subject_name: "IE-III", credits: 3, semester: 8 },
      { subject_name: "SSHAM-V", credits: 2, semester: 8 },
      ];
      await Subject.insertMany(subjects);
      console.log("Subjects seeded!");
    }
})
app.get("/", (req,res)=>{
    res.render("Login")
})


app.post("/Home",async (req,res)=>{
    const {RollNo,password}=req.body
   const user= await User.findOne({RollNo})
    if(!user){
        return res.render("Login",{msg:"Roll Number Not Found"})
    }
    const isValid = await bcrypt.compare(password,user.password)
    if(!isValid){ 
        return res.render("Login",{msg:"Password Incorrect"})
    }
    req.session.user={id:user._id,RollNo:user.RollNo}
    res.redirect("/Home")
})

app.get("/Home", async (req, res) => {
  const semester = req.query.semester || 1;
  let Subjects = [];

  if (semester) {
    Subjects = await Subject.find({ semester });
  }

  res.render("CGPA", { semester, Subjects });
});

app.get("/SignUp",(req,res)=>{
    res.render("SignUp")
})
app.post("/deleteSemester", async (req, res) => {
  try {
    if (!req.session.user) return res.redirect("/");

    const RollNo = req.session.user.RollNo;
    const semesterToDelete = parseInt(req.body.semester);

    const user = await User.findOne({ RollNo });
    if (!user) return res.redirect("/");

    user.semesters = user.semesters.filter(s => s.semester !== semesterToDelete);

    if (user.semesters.length > 0) {
      const totalSgpa = user.semesters.reduce((acc, s) => acc + s.sgpa, 0);
      user.cgpa = (totalSgpa / user.semesters.length).toFixed(2);
    } else {
      user.cgpa = 0;
    }

    await user.save();

    res.redirect("/profile");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting semester");
  }
});

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error logging out");
        }
        res.redirect("/");
    });
});


const gradePoints = { O: 10, A: 9, B: 8, C: 7, D: 6, P: 5, F: 0 };

app.post("/submitGrades", async (req, res) => {

  try {
    const userId = req.session.user?._id || req.session.user?.id;
if (!userId) {
  return res.redirect("/"); 
}
    const { semester, grades } = req.body; 
        

    const subjects = await Subject.find({ semester });

    let totalCredits = 0;
    let totalPoints = 0;

    const semesterGrades = subjects.map((subject) => {
      const grade = grades[subject._id] ? grades[subject._id].toUpperCase() : "F";
      const points = gradePoints[grade] || 0;

      totalCredits += subject.credits;
      totalPoints += points * subject.credits;

      return {
        subject_code: subject._id,
        grade
      };
    });

    const sgpa = totalCredits ? totalPoints / totalCredits : 0;

    const user = await User.findById(userId);
    
    const existingSemesterIndex = user.semesters.findIndex(s => s.semester == semester);
    if (existingSemesterIndex >= 0) {
      user.semesters[existingSemesterIndex].grades = semesterGrades;
      user.semesters[existingSemesterIndex].sgpa = sgpa;
    } else {
      user.semesters.push({ semester, grades: semesterGrades, sgpa });
    }

    const totalSgpa = user.semesters.reduce((acc, s) => acc + s.sgpa, 0).toFixed(2);
    user.cgpa = (user.semesters.length ? totalSgpa / user.semesters.length : 0).toFixed(2);

    await user.save();

    res.render("CGPA", {
      semester,
      Subjects: subjects,
      sgpa: sgpa.toFixed(2),
      cgpa: user.cgpa.toFixed(2)
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.post("/SignUp",async (req,res)=>{
    const {name,password, RollNo, email}=req.body
    const user1= await User.findOne({RollNo:RollNo})
    if(user1){
        return res.render("SignUp",{msg:"User already exists"})
    }
    

    const EMAIL1= await User.findOne({email:email})
    if(EMAIL1){
        return res.render("SignUp",{msg:"Email already exists"})
    }

    const hashedPass=await bcrypt.hash(password,10)
    const user=new User({name:name,password:hashedPass, RollNo:RollNo, email:email})
    await user.save()
    res.redirect("/")
})

app.get("/profile", async (req, res) => {
    if (!req.session.user) return res.redirect("/");

    const RollNo = req.session.user.RollNo;
    const user = await User.findOne({ RollNo });

    if (!user) return res.redirect("/");

    const sortedSemesters = (user.semesters || []).sort((a, b) => a.semester - b.semester);

    res.render("Profile", {
        name: user.name,
        RollNo: user.RollNo,
        email: user.email,
        CGPA: (user.cgpa || 0).toFixed(2),
        allSemesters: sortedSemesters
    });
});



app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})