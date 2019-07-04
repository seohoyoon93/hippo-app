const express = require("express");
const Pool = require("pg").Pool;

const router = express.Router();

// Should have this in seperate config file
const pool = new Pool({
  user: "2easy",
  host: "localhost",
  database: "hippodb",
  password: "2easy",
  port: 5432
});

// Get History
router.get("/", (req, res) => {
  const user_id = req.query.id;
  const from = parseInt(req.query.from);
  const to = parseInt(req.query.to);

  if (to !== NaN) {
    pool.query(
      "SELECT * FROM drinks WHERE user_id = $1 and extract(epoch from created_at) >= $2 and extract(epoch from created_at) < $3 ORDER BY created_at DESC",
      [user_id, from, to],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.status(200).json(result.rows);
      }
    );
  } else {
    pool.query(
      "SELECT * FROM drinks WHERE user_id = $1 and extract(epoch from created_at) >= $2",
      [user_id, from],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.status(200).json(result.rows);
      }
    );
  }
});

// Add water intake
router.post("/", (req, res) => {
  const { user_id, amount } = req.body;

  pool.query(
    "INSERT INTO drinks (user_id, amount) VALUES ($1, $2)",
    [user_id, amount],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(201).send("Added drink");
    }
  );
});

module.exports = router;
