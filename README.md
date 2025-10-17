# 🎓 CGPA Calculator — IIIT Sri City (CSE)

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-Framework-blue?logo=express)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/atlas)
[![Render](https://img.shields.io/badge/Deployed%20on-Render-purple?logo=render)](https://render.com/)
[![IIIT Sri City](https://img.shields.io/badge/IIIT-Sri%20City-CSE-orange)](#)

A full-stack **Node.js + Express + MongoDB Atlas** web app built **for IIIT Sri City CSE students** to compute, track, and visualize their **SGPA & CGPA** seamlessly.
Deployed on **Render** with a cloud-based database on **MongoDB Atlas**.

---

## 🧾 Overview

The CGPA Calculator simplifies academic grade tracking for IIITS CSE students.
Each student can securely log in, manage subjects, and compute accurate SGPA/CGPA, with all data stored in MongoDB Atlas.

---

## ✨ Features

* 👩‍🎓 **IIIT Sri City-CSE** optimized structure and design
* 🔐 Secure login & authentication with `bcrypt` + `express-session`
* 🧮 Instant **SGPA / CGPA calculation**
* 🗂️ Add / delete subjects dynamically
* ☁️ Persistent **cloud storage** using MongoDB Atlas
* 💻 Responsive, clean **EJS + CSS** interface
* 🚀 One-click deployment on **Render**

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
git clone https://github.com/yourusername/cgpa-calculator.git
cd "cgpa calculator"
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas/database).
2. Create a free cluster and copy your **connection string** (looks like this):

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

Visit 👉 [http://localhost:3000](http://localhost:5000)

---

### 5️⃣ Deploy to Render

1. Push your code to GitHub.
2. Visit [Render.com](https://render.com).
3. Click **New → Web Service** and connect your GitHub repo.
4. Set the following in **Environment Variables**:

   * `MONGO_URI` → your Atlas connection string
   * `PORT` → `3000`
5. Click **Deploy** 🎉

Render automatically installs dependencies and starts your Node.js app.

---

## 📁 Folder Structure

```
cgpa calculator/
│
├── models/
│   ├── UserModel.js          # Student authentication schema
│   └── SubjectsSchema.js     # Subject & grade details
│
├── views/                    # EJS templates
├── public/                   # Static assets (CSS, images, JS)
├── server.js                 # Express + Mongoose server
├── package.json              # Dependencies and scripts
└── README.md
```

---

## 🧠 How It Works

1. 👤 Student logs in / registers
2. ➕ Adds subjects, credits, and grades
3. ⚙️ System computes SGPA & CGPA automatically
4. ☁️ Data persists in MongoDB Atlas for next sessions

---

## 🧱 Future Enhancements

* 📊 Graphical CGPA trends (chart.js integration)
* 🧾 Downloadable semester PDF reports
* 🤖 AI-based grade prediction
* 🌙 Dark mode UI

---

## 👨‍💻 Developed By

**Giresh Komal Velaga & Team**
Department of Computer Science and Engineering
**Indian Institute of Information Technology, Sri City**

Built with ❤️ using **Node.js**, **Express**, and **MongoDB Atlas** — deployed on **Render**.
