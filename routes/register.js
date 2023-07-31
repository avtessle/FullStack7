const express = require("express");
const router = express.Router();

<<<<<<< HEAD
let myPassword = "lq2p0J8h";
let myDatabase = "fullStack7";

router.post("/", function (req, res) {
  const { name, password } = req.body;
=======
router.post("/", async function (req, res) {
  const { name, password, email, phone } = req.body;
>>>>>>> ea365c0e36b36b81718ea3f93802f9e1530ac2de

  if (!name || !password) {
    res.status(400).send("Missing name or password");
    return;
  }

  try {
    // Insert data into the passwords table
    let query = `INSERT IGNORE INTO passwords (name, password) VALUES (?, ?)`;
    let values = [name, password];
    let userId;

    const passwordResults = await req.sqlConnect(query, values);

    if (passwordResults.affectedRows === 1) {
      userId = passwordResults.insertId;

      // Insert data into the users table
      query = `INSERT IGNORE INTO users (id, name, phone, email, status) VALUES (?, ?, ?, ?, ?)`;
      values = [userId, name, phone, email, "customer"];

      const userResults = await req.sqlConnect(query, values);

      if (userResults.affectedRows === 1) {
        req.body.id = userId;
        res.status(200).json(req.body);
      } else {
        res.status(500).send("An error occurred while saving user");
      }
    } else {
      res.status(409).send("Name or password already exists");
    }
  } catch (err) {
    console.error("Error executing query: " + err.stack);
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
