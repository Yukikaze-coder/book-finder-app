require("dotenv").config();
const express = require("express");
const cors = require("cors");
const favoritesRoutes = require("./routes/favorites");

const allowedOrigins = [
  "http://localhost:5173",                   // dev frontend
  "https://your-frontend.onrender.com"       // deployed frontend
];


const app = express();


app.use(cors());
app.use(express.json());

app.use(express.json());

// ✅ API routes
app.use("/favorites", favoritesRoutes);

// ✅ Default root route (helpful for health checks)
app.get("/", (req, res) => {
  res.send("📚 Book Finder API is running!");
});

// ✅ Catch unknown routes
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.originalUrl}` });
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

