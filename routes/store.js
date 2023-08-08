const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const query = `SELECT * FROM products`;

  req
    .sqlConnect(query)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
});

router.put("/", (req, res) => {
  const product = req.body;
  const query = `UPDATE products SET quantity = ? WHERE id = ?`;
  const values = [product.quantity, product.id];

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

router.delete("/:productId", (req, res) => {
  const query = `DELETE from products WHERE id = ?`;
  const values = [req.params.productId];

  req
    .sqlConnect(query, values)
    .then(() => {
      res.status(200).json({ message: "Products deleted successfully" });
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
