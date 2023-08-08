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
      res.status(200).json(results);
      // if (results.length > 0) {
      //   res.status(200).json(results);
      // } else {
      //   res.status(404).send("No jewelry from this category");
      // }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
});

router.delete("/:productId", (req, res) => {
  const query = `DELETE from products WHERE id = ?`;
  const values = [req.params.productId];

  req
    .sqlConnect(query, values)
    .then(() => {
      res.status(200).json({ message: "Product deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
});
module.exports = router;
