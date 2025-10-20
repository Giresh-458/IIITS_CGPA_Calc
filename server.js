const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const mongoose = require("mongoose")
const session = require("express-session")
const bcrypt=require("bcrypt")
const User = require("./models/UserModel")
const Subject = require("./models/SubjectsSchema");

const dotenv = require("dotenv")
dotenv.config({ path: './.env' })

const app = express()
const PORT= process.env.PORT

app.use(express.json());
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname, "public")));

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
app.get("/changepass",(req,res)=>{
  if(!req.session.user){
    return res.redirect("/")
  }
})

app.get("/profile", async (req, res) => {
    if (!req.session.user) return res.redirect("/");

    const RollNo = req.session.user.RollNo;
    const user = await User.findOne({ RollNo });

    if (!user) return res.redirect("/");

    const sortedSemesters = (user.semesters || []).sort((a, b) => a.semester - b.semester);
    req.session.profile= {name: user.name,
        RollNo: user.RollNo,
        email: user.email,
        CGPA: (user.cgpa || 0).toFixed(2),
        allSemesters: sortedSemesters,
        path: user.path || null,
        Branch: user.Branch}
    res.render("Profile", req.session.profile);
});

app.post("/changepass",async(req,res)=>{
  
  if(!req.session.user){
    return res.redirect("/")
  }
  const {Old,New} = req.body
  profile= req.session.profile
  let user=await User.findOne({RollNo: req.session.user.RollNo})
  let isValid=await bcrypt.compare(Old,user.password)
  if(isValid){
    user.password = await bcrypt.hash(New,10)
    await user.save()
    return res.render("Profile",{...profile,msg:"Password changed successfully"})}
   return res.render("Profile",{...profile,msg:"Password Incorrect"})
  }
)
app.post("/deleteAcc", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/");
    }

    const rollNo = req.session.user.RollNo;

    const deletedUser = await User.findOneAndDelete({ RollNo: rollNo });

    if (!deletedUser) {
      return res.status(404).send("User not found.");
    }

    req.session.destroy(err => {
      if (err) console.error("Session destroy error:", err);
    });

    return res.render('Login',{msg1:"acc deleted successfully"});
  } catch (err) {
    console.error("❌ Error deleting account:", err);
    res.status(500).send("Internal Server Error");
  }
});


app.get("/Home", async (req, res) => {
  if (!req.session.user) return res.redirect("/");

  const semester = parseInt(req.query.semester) || 1;
  const user = await User.findById(req.session.user.id);
  const path = user.path || null;

  let Subjects = await Subject.find({ semester });

  if ([5,6,7,8].includes(semester)) {
    if (path === "honours") {
      Subjects = Subjects.filter(s => !s.subject_name.toLowerCase().includes("btp"));
    } else if (path === "btp") {
      Subjects = Subjects.filter(s => !s.subject_name.toLowerCase().includes("honours"));
    }
  }

  res.render("CGPA", { semester, Subjects, path });
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
    const userId = req.session.user?.id;
    if (!userId) return res.redirect("/");

    const { semester, grades } = req.body;
    let subjects = await Subject.find({ semester });

    const user = await User.findById(userId);
    if (semester==6||semester==5||semester==7||semester==8) {
      if (user.path == "honours") {
        subjects = subjects.filter(s => !s.subject_name.toLowerCase().includes("btp"));
        
      } else if (user.path == "btp") {
        subjects = subjects.filter(s => !s.subject_name.toLowerCase().includes("honours"));
      }
    }

    

    let totalCredits = 0;
    let totalPoints = 0;

    const semesterGrades = subjects.map(subject => {
      const grade = grades[subject._id] ? grades[subject._id].toUpperCase() : "F";
      const points = gradePoints[grade] || 0;

      totalCredits += subject.credits;
      totalPoints += points * subject.credits;

      return { subject_code: subject._id, grade };
    });

    const sgpa = totalCredits ? totalPoints / totalCredits : 0;

    const existingSemesterIndex = user.semesters.findIndex(s => s.semester == semester);
    if (existingSemesterIndex >= 0) {
      user.semesters[existingSemesterIndex].grades = semesterGrades;
      user.semesters[existingSemesterIndex].sgpa = sgpa;
    } else {
      user.semesters.push({ semester, grades: semesterGrades, sgpa });
    }

    const totalSgpa = user.semesters.reduce((acc, s) => acc + s.sgpa, 0);
    user.cgpa = (user.semesters.length ? (totalSgpa / user.semesters.length).toFixed(2) : 0);

    await user.save();

    res.render("CGPA", {
      semester,
      Subjects: subjects,
      sgpa: sgpa.toFixed(2),
      cgpa: user.cgpa,
      path: user.path
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});



app.get("/selectPath", async (req, res) => {
  res.render("SelectPath"); 
});


app.post("/selectPath", async (req, res) => {
  const { path } = req.body; 
  const user = await User.findById(req.session.user.id);

  if (user.path && user.path !== path) {
    user.semesters = user.semesters.filter(s => s.semester < 5 || s.semester > 8);
  }

  user.path = path;
  await user.save();

  res.redirect("/Home?semester=5");
});

app.post("/Branch", async (req, res) => {
  if(!req.session.user){
    res.redirect("/")
  }
  const { Branch } = req.body; 
  const user = await User.findById(req.session.user.id);
   if (user.Branch && user.Branch !== Branch) {
    user.semesters = user.semesters.filter(s=>s.semester<1);
  }
  user.Branch = Branch;
  await user.save();
res.send(`
  <script>
    alert('Branch Changed Successfully');
    window.location.href = '/Home?semester=1';
  </script>
`);
});



app.post("/SignUp",async (req,res)=>{
    let {name,password, RollNo, email, Branch}=req.body
    const user1= await User.findOne({RollNo:RollNo})
    email=email.toLowerCase()
    if(user1){
        return res.render("SignUp",{msg:"User already exists"})
    }
    

    const EMAIL1= await User.findOne({email:email})
    if(EMAIL1){
        return res.render("SignUp",{msg:"Email already exists"})
    }

    const hashedPass=await bcrypt.hash(password,10)
    const user=new User({name:name,password:hashedPass, RollNo:RollNo, email:email,Branch: Branch})
    await user.save()
    res.redirect("/")
})





app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})