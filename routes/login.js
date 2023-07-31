const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

let myPassword = "lq2p0J8h";
let myDatabase = "fullStack7";

router.post("/", (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400).send("Missing name or password");
    return;
  }

  const query = `SELECT * FROM passwords NATURAL JOIN users WHERE name = '${name}' LIMIT 1`;

  sqlConnect(query)
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

function sqlConnect(query, values = []) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: myPassword,
      database: myDatabase,
    });

    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL server: " + err.stack);
        reject(err);
        return;
      }
      console.log("Connected to MySQL server");

      connection.query(query, values, (err, results) => {
        if (err) {
          console.error("Error executing query: " + err.code);
          reject(err);
        }

        connection.end((err) => {
          if (err) {
            console.error("Error closing connection: " + err.stack);
            return;
          }
          console.log("MySQL connection closed");
        });

        resolve(results);
      });
    });
  });
}

module.exports = router;
