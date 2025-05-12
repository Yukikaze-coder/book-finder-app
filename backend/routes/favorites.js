const express = require("express");
const router = express.Router();
const pool = require("../db");

// POST /favorites
router.post("/", async (req, res) => {
  const { user_id, book_id, title, authors, thumbnail } = req.body;

  console.log("Incoming favorite data:", req.body);

  try {
    const result = await pool.query(
      `INSERT INTO favorites (user_id, book_id, title, authors, thumbnail)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, book_id, title, authors, thumbnail]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Database error:", error);

    if (error.code === '23505') {
    return res.status(409).json({ error: 'Duplicate book for user' });
  }
  
    res.status(500).json({ error: "Failed to save favorite" });
  }
});

// GET /favorites/:user_id
router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM favorites WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

// DELETE /favorites/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM favorites WHERE id = $1", [id]);
    res.sendStatus(204);
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete favorite" });
  }
});


module.exports = router;
