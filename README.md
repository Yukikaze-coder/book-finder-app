# 📚 Book Finder App

A modern, full-stack web application for discovering, saving, and managing your favorite books. Users can search books via the Google Books API, authenticate using Firebase (email/password or Google login), and save their favorite books using a PostgreSQL database.

---

## 🌐 Live Demo

- **Frontend:** [https://book-finder-app-1.onrender.com](https://book-finder-app-1.onrender.com)
- **Backend:** [https://book-finder-app-epog.onrender.com](https://book-finder-app-epog.onrender.com)

---

## ✨ Features

- 🔍 Search books using the Google Books API
- ✅ Sign up & sign in using Firebase Authentication
  - Google OAuth
  - Email/password
- ❤️ Save books to your favorites
- 🔄 View/delete your saved favorites
- 🔥 Responsive, modern UI built with Tailwind CSS
- ✅ Protected routes and error handling
- 💾 Data persisted via PostgreSQL and managed via Knex.js

---

## 🛠️ Tech Stack

**Frontend**  
- React + Vite
- Tailwind CSS
- Firebase (Auth, Storage)
- Axios
- React Router
- React Hot Toast

**Backend**  
- Node.js + Express
- PostgreSQL (via Render)
- Knex.js (query builder)
- CORS / dotenv

---

## 🧪 How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/book-finder-app.git
cd book-finder-app

Setup the Backend

cd backend
npm install
# Create a .env file and fill in DB credentials
cp .env.example .env
npm run migrate
npm run dev


Setup the Frontend


cd ../frontend
npm install
# Create a .env file and add Firebase + Google Books API keys
cp .env.example .env
npm run dev



⚙️ Environment Variables

.env for frontend (example)


VITE_GOOGLE_BOOKS_API_KEY=your_google_books_api_key
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_FIREBASE_API_KEY=...
VITE_APP_FIREBASE_AUTH_DOMAIN=...
VITE_APP_FIREBASE_PROJECT_ID=...
VITE_APP_FIREBASE_STORAGE_BUCKET=...
VITE_APP_FIREBASE_MESSAGING_SENDER_ID=...
VITE_APP_FIREBASE_APP_ID=...



.env for backend (example)

Edit
# LOCAL ONLY
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_HOST=localhost
DATABASE_NAME=book_finder

# RENDER
DATABASE_URL=postgres://...



📁 Project Structure

book-finder-app/
├── backend/
│   ├── routes/
│   ├── db.js
│   ├── knexfile.js
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── tailwind.config.js



## 🚀 Future Enhancements


🌙 Add a Dark mode toggle
📂 Add user profiles (avatar + bio)
📊 Add sorting/filtering for favorites
🧠 Book recommendations based on categories
📱 PWA support for offline use
