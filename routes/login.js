const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400).send("Missing name or password");
    return;
  }

  const passwordQuery = `SELECT * FROM passwords WHERE name = ? LIMIT 1`;
  const passwordValues = [name];

  req.sqlConnect(passwordQuery, passwordValues)
    .then((passwordResults) => {
      if (passwordResults.length === 1 && passwordResults[0].password === password) {
        const userId = passwordResults[0].id;

        const userQuery = `SELECT * FROM users WHERE id = ? LIMIT 1`;
        const userValues = [userId];

        return req.sqlConnect(userQuery, userValues);
      } else {
        throw new Error("Wrong name or password");
      }
    })
    .then((userResults) => {
      if (userResults.length === 1) {
        res.status(200).json(userResults[0]);
      } else {
        throw new Error("User not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(401).send(err.message); // You can adjust the status code accordingly
    });
});

module.exports = router;
