const express = require("express");
const router = express.Router();

/* 
router.post("/:userId", (req, res) => {
  const product = req.body;
  const query = `INSERT INTO cart_products (productId, userId, quantity) VALUES (?, ?, ?)`;
  const values = [product.productId, product.userId, product.quantity];

  req
    .sqlConnect(query, values)
    .then((results) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
});

router.put("/:userId", (req, res) => {
  const product = req.body;
  const query = `UPDATE cart_products SET quantity = ? WHERE productId = ? AND userId = ?`;
  const values = [product.quantity, product.productId, req.params.userId];

  req
    .sqlConnect(query, values)
    .then(() => {
      res.status(200).json(product);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
}); */

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
