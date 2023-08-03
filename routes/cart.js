const express = require("express");
const router = express.Router();

router.get("/:userId", (req, res) => {
  const query = `
  SELECT  cp.productId, cp.userId, cp.quantity, p.category, p.description, p.price
  FROM cart_products cp
  JOIN products p 
  ON cp.productId = p.id
  WHERE cp.userId = ?
`;
  const values = [req.params.userId];

  req
    .sqlConnect(query, values)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
});

module.exports = router;
