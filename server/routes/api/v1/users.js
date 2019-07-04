const express = require("express");
const Pool = require("pg").Pool;
const uuidv4 = require("uuid/v4");

const router = express.Router();

// Should have this in seperate config file
const pool = new Pool({
  user: "2easy",
  host: "localhost",
  database: "hippodb",
  password: "2easy",
  port: 5432
});

// Get user settings
router.get("/:id", (req, res) => {
  const id = req.params.id;

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// Update user settings
router.put("/:id", (req, res) => {
  const id = req.params.id;

  const lang = req.body.lang;
  const goal = req.body.goal;
  const allowed_notification = req.body.allowed_notification;
  const notiStartTime = req.body.notification_start_time;
  const notiEndTime = req.body.notification_end_time;
  const notiPeriod = req.body.notification_period;
  const unit = req.body.unit;
  const height = req.body.height;
  const weight = req.body.weight;

  if (lang !== undefined) {
    updateSetting("lang", lang, id);
  }

  if (goal !== undefined) {
    const goalValue = parseInt(goal);
    updateSetting("goal", goalValue, id);
  }

  if (allowed_notification !== undefined) {
    updateSetting("allowed_notification", allowed_notification, id);
  }

  if (notiStartTime !== undefined) {
    const notiStartTimeValue = parseInt(notiStartTime);
    updateSetting("notification_start_time", notiStartTimeValue, id);
  }

  if (notiEndTime !== undefined) {
    const notiEndTimeValue = parseInt(notiEndTime);
    updateSetting("notification_end_time", notiEndTimeValue, id);
  }

  if (notiPeriod !== undefined) {
    const notiPeriodValue = parseInt(notiPeriod);
    updateSetting("notification_period", notiPeriodValue, id);
  }

  if (unit !== undefined) {
    updateSetting("unit", unit, id);
  }

  if (height !== undefined) {
    const heightValue = parseInt(height);
    updateSetting("height", heightValue, id);
  }

  if (weight !== undefined) {
    const weightValue = parseInt(weight);
    updateSetting("weight", weightValue, id);
  }

  res.status(200).send(`User modified with ID: ${id}`);
});

const updateSetting = (row, value, id) => {
  pool.query(
    `UPDATE users SET ${row} = $1 WHERE id = $2`,
    [value, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      return;
    }
  );
};

// Create user
router.post("/", (req, res) => {
  const {
    unit,
    height,
    weight,
    gender,
    training,
    goal,
    lang,
    device_id,
    allowed_notification,
    notification_start_time,
    notification_end_time,
    notification_period
  } = req.body;

  const id = uuidv4();

  pool.query(
    "INSERT INTO users (id, unit, height, weight, gender, training, goal, lang, device_id, allowed_notification, notification_start_time, notification_end_time, notification_period) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id",
    [
      id,
      unit,
      height,
      weight,
      gender,
      training,
      goal,
      lang,
      device_id,
      allowed_notification,
      notification_start_time,
      notification_end_time,
      notification_period
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).send(result.rows[0].id);
    }
  );
});

module.exports = router;
