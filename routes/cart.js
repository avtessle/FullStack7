const express = require("express");
const router = express.Router();

router.get("/:userId", (req, res) => {
  const query = `
  SELECT  cp.productId, cp.userId, cp.quantity, p.category, p.description, p.price,p.image
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

router.post("/:userId", (req, res) => {
  const product = req.body;
  const query = `INSERT INTO cart_products (productId, userId, quantity) VALUES (?, ?, ?)`;
  const values = [product.productId, product.userId, product.quantity];

  req
    .sqlConnect(query, values)
    .then(() => {
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
});

router.delete("/product/:productId", (req, res) => {
  const query = `DELETE from cart_products WHERE productId = ?`;
  const values = [req.params.productId];

  req
    .sqlConnect(query, values)
    .then(() => {
      res.status(200).json({ message: "Cart Product deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
});

router.delete("/user/:userId", (req, res) => {
  const query = `DELETE from cart_products WHERE userId = ?`;
  const values = [req.params.userId];

  req
    .sqlConnect(query, values)
    .then(() => {
      res.status(200).json({ message: "Cart Product deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
});

router.delete("/:userId/:productId", (req, res) => {
  const query = `DELETE from cart_products WHERE productId = ? And userId = ?`;
  const values = [req.params.productId, req.params.userId];

  req
    .sqlConnect(query, values)
    .then(() => {
      res.status(200).json({ message: "Cart Product deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
});

module.exports = router;
