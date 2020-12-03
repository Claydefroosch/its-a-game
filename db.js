const spicedPG = require("spiced-pg");
const db = spicedPG(process.env.DATABASE_URL || "postgres:root:hallo:@localhost:5432/highscore");

// Adds a new signature to the database
exports.uploadHighscore = (username, score) => {
  return db.query("INSERT INTO highscore (username, score) VALUES ($1, $2) RETURNING *;", [username, score]);
};

exports.getHighscore = () => {
  return db.query("SELECT * FROM highscore ORDER BY score DESC LIMIT 12;");
};
