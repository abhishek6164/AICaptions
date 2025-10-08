📘 README.md
# 📸 AI Caption Generator

An intelligent **AI-powered image caption generator** built with **MERN Stack** + **Gemini API**.  
Upload an image → get an auto-generated, emoji-filled caption — perfect for social media creators 💫  

---

## 🚀 Features

✅ Upload images directly from your device  
✅ Automatically generate captions using **Google Gemini AI**  
✅ Store posts securely in **MongoDB**  
✅ Image hosting via **ImageKit**  
✅ Beautiful **Tailwind CSS** UI  
✅ Fully responsive design  
✅ Authentication with **JWT**  
✅ Error-handled and production-ready backend  

---

## 🏗️ Tech Stack

| Layer    | Technology Used                               |
| -------- | --------------------------------------------- |
| Frontend | React 19, Tailwind CSS 4, Axios, React Router |
| Backend  | Node.js, Express.js, MongoDB, Mongoose        |
| AI       | Google Gemini (Generative Language API)       |
| Storage  | ImageKit                                      |
| Auth     | JWT + bcryptjs                                |
| Tools    | Vite, dotenv, multer                          |

---

## 📁 Folder Structure



root/
│
├── frontend/ (Vite + React)
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── api.js
│ ├── package.json
│ └── tailwind.config.js
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── services/
│ ├── .env
│ ├── server.js
│ └── package.json
│
└── README.md


---

## ⚙️ Environment Variables (.env)

Create a `.env` file in your `backend/` directory and add:

```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

# ImageKit credentials
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

# Gemini API Key
GEMINI_API_KEY=AIzaSyAxxxxxxx_your_real_key

🧠 Setup Instructions
1️⃣ Clone Repo
git clone https://github.com/your-username/ai-caption-generator.git
cd ai-caption-generator

2️⃣ Setup Backend
cd backend
npm install
npm start

3️⃣ Setup Frontend
cd frontend
npm install
npm run dev


Then open 👉 http://localhost:5173

💡 API Endpoints
Method	Endpoint	Description
POST	/api/posts	Upload image + auto-generate caption
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
🧩 How It Works

User uploads an image

Backend converts it to Base64

Gemini AI generates a short caption with emojis + hashtags

Image gets uploaded to ImageKit

MongoDB stores the post with image URL + caption

🖼️ Frontend Preview
Upload Page	Generated Caption

	
🔐 Security

Environment variables secured with dotenv

Passwords hashed via bcryptjs

Tokens verified with jsonwebtoken

CORS properly configured

🌟 Future Enhancements

Add user dashboard for posts

Multiple image uploads

AI-based hashtag suggestions

Voice caption generation using Gemini multimodal

👨‍💻 Author

Abhishek Pipriye
Frontend Developer | MERN Stack | AI Enthusiast
💼 LinkedIn
 • 🌐 Portfolio