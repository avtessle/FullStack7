const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");

const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const storeRouter = require("./routes/store");

app.use(express.json());
app.use(cors());

const myPassword = "avigayiltess";
const myDatabase = "fullStack7";

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

// Define the middleware to establish the database connection
function sqlConnectMiddleware(req, res, next) {
  req.sqlConnect = sqlConnect;
  next();
}

// Use the sqlConnectMiddleware for all routes
app.use(sqlConnectMiddleware);

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/store", storeRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3000");
});
