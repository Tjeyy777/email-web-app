# Email CRUD Web App 📬

A professional-grade Email CRUD (Create, Read, Update, Delete) web application built using **React.js**, designed to showcase UI capabilities, state management, chart visualizations, and user interaction. Built with Material UI, Framer Motion, and Recharts, it features an engaging user experience and a dashboard-style layout.

---

## 🚀 Features

- ✅ **Create, Edit, Delete, and View Emails**
- 📁 **Export to PDF and Excel**
- 🔎 **Search functionality** 
- 🌙 **Dark/Light Theme Toggle**
- 📊 **Email statistics with Bar and Pie charts**
- 🧠 **Smart Tagging** (`Personal`, `Work`, `Business`)
- 🧾 **Detailed Email Modal Viewer**
- 💾 **Persistent storage using LocalStorage**
- 📦 **Responsive UI using Material UI**
- 💫 **Animations using Framer Motion**
- 📂 Clean, modular folder structure for scalability

---

## 🛠️ Technologies Used

- **ReactJS** (v18.2.0) - For building UI components and state management
- **Material UI** (v5.14.1) - For modern, responsive design
- **Framer Motion** (v10.16.4) - For animations
- **Recharts** (v2.7.2) - For visualizing email data (Bar & Pie charts)
- **jsPDF** (v2.5.1) - For exporting data to PDF
- **SheetJS (xlsx)** (v0.18.5) - For exporting data to Excel
- **LocalStorage** - For data persistence
- **Responsive design** with Flex/Grid Layouts

---

## 🧑‍💻 How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/Tjeyy777/email-web-app.git
cd email-web-app
```

### 2. Install Dependencies
Use the legacy peer dependencies flag to avoid any conflicts (especially with Material UI).
```bash
npm install --legacy-peer-deps
```

### 3. Start the Development Server
```bash
npm start
```

Open `http://localhost:3000` in your browser to see the app.

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── EmailForm.jsx
│   ├── EmailList.jsx
│   ├── EmailPreview.jsx
│   ├── StatsBarChart.jsx
│   ├── StatsPieChart.jsx
│   └── ThemeToggle.jsx
├── utils/
│   └── validators.js
├── App.jsx
└── index.js
```

---

## 📌 Why This Project?

As a fresher, I developed this app to demonstrate proficiency in building interactive React applications. This project showcases not only basic CRUD operations but also:
- State management using React hooks
- Modern UI/UX principles
- Data visualization and export capabilities
- Code organization and modularity

I’ve built this by focusing on **real-world features**, **robustness**, and **developer best practices**.

---

## 🧠 Future Enhancements

- Backend integration (Node.js + MongoDB or Firebase)
- Email authentication & login
- Rich text editor for content
- Notification system

---

> Built with 💙 by Abhimanue TJ
