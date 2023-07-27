const express = require("express");
const app = express();
const cors = require("cors");

//const mysql = require("mysql2");

const loginRouter = require("./routes/login");
const storeRouter = require("./routes/store");

app.use(express.json());
app.use(cors());
app.use("/login", loginRouter);
app.use("/register", loginRouter);
app.use("/store", storeRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
