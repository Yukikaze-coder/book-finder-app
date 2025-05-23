require("dotenv").config();
const express = require("express");
const cors = require("cors");
const favoritesRoutes = require("./routes/favorites");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",                         
  "https://book-finder-app-1.onrender.com",       
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// ✅ API routes
app.use("/api/favorites", favoritesRoutes);

// ✅ Default root route 
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

