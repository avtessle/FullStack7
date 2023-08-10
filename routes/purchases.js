const express = require("express");
const router = express.Router();

router.get("/:userId", (req, res) => {
  const query = `SELECT  * FROM sold_products WHERE userId = ?`;
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

router.post("/:userId", async function (req, res) {
  const product = req.body;
  const query = `INSERT INTO sold_products (purchaseId,productId, userId,date, quantity) VALUES (?, ?, ?, ?, ?)`;
  const values = [
    product.purchaseId,
    product.productId,
    product.userId,
    new Date(),
    product.quantity,
  ];

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

//update user purchases in users
router.put("/:userId", (req, res) => {
  const user = req.body;
  const query = `UPDATE users SET purchases = ? WHERE id= ?`;
  const values = [user.purchases, user.id];

  req
    .sqlConnect(query, values)
    .then(() => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
});

module.exports = router;
