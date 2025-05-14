const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all favorites for all users (optional)
router.get("/", async (req, res) => {
  
    console.log('Hi');
    const result = await db.query("SELECT * FROM favorites ORDER BY created_at DESC");
    console.log(result);
    res.status(200).json(result.rows);
  
});

// GET favorites for a specific user
router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM favorites WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

// POST - Add a new favorite
router.post("/", async (req, res) => {
  const { user_id, book_id, title, authors, thumbnail } = req.body;

  if (!user_id || !book_id) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const result = await db.query(
      `INSERT INTO favorites (user_id, book_id, title, authors, thumbnail)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, book_id, title, authors, thumbnail]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error saving favorite:", error);

    if (error.code === "23505") {
      return res.status(409).json({ error: "This book is already saved." });
    }

    res.status(500).json({ error: "Failed to save favorite." });
  }
});

// DELETE - Remove a favorite by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM favorites WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount > 0) {
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ error: "Favorite not found." });
    }
  } catch (error) {
    console.error("Error deleting favorite:", error);
    res.status(500).json({ error: "Failed to delete favorite." });
  }
});

module.exports = router;