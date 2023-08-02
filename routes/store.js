const express = require("express");
const router = express.Router();

router.get("/:jewelry", (req, res) => {
  const query = `SELECT * FROM products WHERE category = ?`;
  const values = [
    req.params.jewelry.substring(0, req.params.jewelry.length - 1),
  ];

  req
    .sqlConnect(query, values)
    .then((results) => {
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).send("No jewelry from this category");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
});

module.exports = router;
