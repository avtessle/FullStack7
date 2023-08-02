const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400).send("Missing name or password");
    return;
  }

  const query = `SELECT * FROM passwords WHERE name = ? LIMIT 1`;
  const values = [name];

  req
    .sqlConnect(query, values)
    .then((results) => {
      if (results.length === 1 && results[0].password === password) {
        res.status(200).json(results[0]);
      } else {
        res.status(401).send("Wrong name or password");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
});

module.exports = router;
