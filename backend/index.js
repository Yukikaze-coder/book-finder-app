require("dotenv").config();
const express = require("express");
const cors = require("cors");
const favoritesRoutes = require("./routes/favorites");

const allowedOrigins = [
  "http://localhost:5173",                   // dev frontend
  "https://your-frontend.onrender.com"       // deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

const app = express();
//app.use(cors());
app.use(express.json());

app.use("/favorites", favoritesRoutes);
app.use(express.static("./frontend/dist"));


app.listen(3000, () => {
  console.log("Server running on port 3000");
});

