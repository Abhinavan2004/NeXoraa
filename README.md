# NeXoraa 🚀

**NeXoraa** is a modern full-stack web application  designed to deliver a seamless and scalable platform for managing users, content, and services in a structured way.  
The project demonstrates a software system built with **JavaScript frameworks, REST APIs, authentication, and database integration**, making it an excellent example of end-to-end application development.

---

## ✨ Key Highlights

- 🌐 Full-stack architecture (frontend + backend + database)  
- 🔐 Secure authentication & authorization   
- 📊 Interactive dashboard for users  
- ⚡ RESTful API integration with frontend  
- 📂 Clean, modular codebase (easy for collaboration & scaling)  

---

## 🖼️ Project Description

NeXoraa is a next-generation social networking platform designed to connect people with their friends and communities. It provides a seamless space for users to chat, share, and interact with each other in real-time.
With NeXoraa, users can:

- 👥 Create and manage friend connections
- 💬 Chat in real-time with a modern messaging system
- 🎥 Make video calls and stay connected face-to-face
- 📰 Share updates, posts, and media to engage with friends

Built with modern web technologies, NeXoraa combines user-friendly UI, secure backend services, and scalable architecture to provide an engaging social experience.

---

## 🛠 Tech Stack

| Layer          | Technology (Suggested) |
|---------------|-------------------------|
| **Frontend**  | HTML, TailwindCSS, JavaScript,  React.js, DaisyUI  |
| **Backend**   | Node.js, Express.js |
| **Database**  | MongoDB |
| **Auth**      | JWT (JSON Web Tokens) + Bcrypt.js |
| **Deployment**| GitHub |
| **Others**    | dotenv for env config, Axios for API calls, CORS,  Postman for testing, VsCode for IDE |

---

## 📂 Project Structure

```
NeXoraa/
│── backend/                # Server-side (Node.js + Express + MongoDB)
│   ├── node_modules/       # Backend dependencies
│   └── src/
│       ├── controllers/    # Handle request/response logic
│       ├── lib/            # Utility/helper functions
│       ├── middleware/     # Authentication, validation, security middlewares
│       ├── models/         # Mongoose models (User, Chat, Call, etc.)
│       ├── routes/         # API route definitions
│       ├── server.js       # Entry point for backend server
│       └── .env            # Environment variables (PORT, DB_URI, etc.)
│   ├── package.json        # Backend dependencies & scripts

│── frontend/               # Client-side (React + Vite + Tailwind CSS
│   ├── node_modules/       # Frontend dependencies
│   ├── public/             # Static assets (favicon, index.html, etc.)
│   └── src/                # React components, hooks, and pages
|       ├── components/   
│       ├── lib/          
│       ├── constants/    
│       ├── packages/         
│       ├── App.jsx    
│       ├── main.jsx          
│   ├── index.html          # Main HTML file
│   ├── vite.config.js      # Vite configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── postcss.config.js   # PostCSS configuration
│   ├── package.json        # Frontend dependencies & scripts

│── documentation.md        # Project documentation  
│── README.md               # Project overview (this file)
│── .gitignore              # Ignored files & folders

```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16+)  
- npm or yarn  
- MongoDB  
- Git installed  

### Clone Repository
```bash
git clone https://github.com/Abhinavan2004/NeXoraa.git
cd NeXoraa
```
### Backend Setup
```bash
cd backend

npm install

cp .env.example .env   # configure DB_URI, JWT_SECRET, PORT

npm run dev            # or npm start
```
Frontend Setup
```bash
cd ../frontend

npm install

cp .env.example .env   # configure API base URL

npm run dev
```
Open in browser → http://localhost:3000

---

## ▶️ Usage Flow
Signup / Login → create account and authenticate

Onboarding Dashboard → Update user details and profile 

User Dashboard --> View User Dashboard , connections , features.

---

## 🤝 Contributing
Contributions are welcome!

- Fork this repo
- Create a branch → ```git checkout -b feat/feature-name```
- Commit changes → ```git commit -m "feat: add feature"```
- Push branch → ```git push origin feat/feature-name```
- Open a Pull Request

---
## 📧 Contact
Author: Abhinav Anpan

GitHub: Abhinavan2004

Repo: https://github.com/Abhinavan2004/NeXoraa

