require("dotenv").config();
const express = require("express");
const cors = require("cors");
const favoritesRoutes = require("./routes/favorites");


const app = express();
app.use(cors());
app.use(express.json());

app.use("/favorites", favoritesRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
