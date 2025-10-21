

---

# 🎓 CGPA Calculator — IIIT Sri City (CSE · ECE · AIDS)

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-Framework-blue?logo=express)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/atlas)
[![Render](https://img.shields.io/badge/Deployed%20on-Render-purple?logo=render)](https://render.com/)

A full-stack **Node.js + Express + MongoDB Atlas** web app built **for IIIT Sri City students** across **CSE, ECE, and AIDS branches** to compute, track, and visualize their **SGPA & CGPA** seamlessly.
Deployed on **Render**, with a cloud database hosted on **MongoDB Atlas**.

---

## 🧾 Overview

The **CGPA Calculator** simplifies academic performance tracking for **IIIT Sri City** students.
Students from **CSE**, **ECE**, and **AIDS** branches can securely log in, manage subjects by semester and branch, and compute accurate **SGPA/CGPA**, with all records safely stored in MongoDB Atlas.

---

## ✨ Features

* 🧑‍🎓 Supports **CSE, ECE, and AIDS** branch structures
* 🔐 Secure login & authentication using `bcrypt` + `express-session`
* 🧮 Instant **SGPA / CGPA calculation**
* 🗂️ Add, update, or delete subjects dynamically
* ☁️ Persistent **cloud data storage** (MongoDB Atlas)
* 💻 Responsive & clean **EJS + CSS** UI
* 🚀 Deployed easily on **Render**

---

## 🧩 Tech Stack

| Layer          | Technology               |
| -------------- | ------------------------ |
| Frontend       | HTML · CSS · EJS         |
| Backend        | Node.js · Express.js     |
| Database       | MongoDB Atlas (Mongoose) |
| Deployment     | Render Cloud Platform    |
| Authentication | bcrypt + express-session |

---

## ⚙️ Setup & Deployment Guide

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Giresh-458/IIITS_CGPA_Calc.git
cd "IIITS_CGPA_Calc"
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas/database)
2. Create a free cluster and copy your **connection string**, for example:

   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/CGPA-IIITS
   ```
3. Add it to your environment variables:

   ```bash
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/CGPA-IIITS
   ```

In your `server.js`:

```js
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Atlas connected"))
.catch(err => console.error(err));
```

### 4️⃣ Run Locally

```bash
npm start
```

Visit 👉 [http://localhost:3000](http://localhost:3000)

---

### 5️⃣ Deploy to Render

1. Push your project to GitHub
2. Go to [Render.com](https://render.com)
3. Click **New → Web Service**
4. Connect your GitHub repository
5. Add these **Environment Variables**:

   * `MONGO_URI` → your Atlas connection string
   * `PORT` → `3000`
6. Click **Deploy** 🎉

---

## 📁 Folder Structure

```
cgpa calculator/
│
├── models/
│   ├── UserModel.js          # Authentication schema
│   └── SubjectsSchema.js     # Subject & grade details
│   
├── views/                    # EJS templates
├── public/                   # Static assets (CSS, JS, images)
├── server.js                 # Express + Mongoose server setup
├── package.json              # Dependencies and scripts
└── README.md
```

---

## 🧠 How It Works

1. 👤 Student logs in / registers
2. 🎓 Selects branch (CSE, ECE, or AIDS)
3. ➕ Adds subjects, credits, and grades
4. ⚙️ System computes SGPA & CGPA automatically
5. ☁️ Data persists in MongoDB Atlas for next sessions

---

## 🧱 Future Enhancements

* 📊 Visual **CGPA/SGPA trends** with Chart.js
* 🧾 **Downloadable reports (PDF)**
* 🤖 **AI-based grade prediction**
* 🌙 **Dark mode UI**
* 🔄 **Branch-based subject templates**

---

## 👨‍💻 Developed By

**Giresh Komal Velaga & Team**
Department of Computer Science and Engineering
**Indian Institute of Information Technology, Sri City**

Built with ❤️ using **Node.js**, **Express**, and **MongoDB Atlas** — deployed on **Render**.

---

