const mysql = require('mysql2');

const myPassword = "lq2p0J8h";
const myDatabase = "fullStack7";

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: myPassword,
  database :"fullStack7"
});

function createTable(createTableQuery, data, type) {
  const insertQuery = `INSERT INTO ${type} VALUES ?`;

  const keys = Object.keys(data[0]);
  const dataValues = data.map((item) => keys.map((key) => item[key]));

  con.query(createTableQuery, (err, results) => {
    if (err) throw err;
    console.log(`${type} table created successfully`);
    
    con.query(insertQuery, [dataValues], (err, results) => {
      if (err) throw err;
      console.log(`${type} Users data inserted successfully`);
    });
  });
}

const createUsersTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL
);`;

const usersData = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "email": "Sincere@april.biz",
    "phone": "1-770-736-8031 x56442",
    "status": "admin",
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "email": "Shanna@melissa.tv",
    "phone": "010-692-6593 x09125",
    "status": "customer",
  },
  {
    "id": 3,
    "name": "Clementine Bauch",
    "email": "Nathan@yesenia.net",
    "phone": "1-463-123-4447",
    "status": "customer",
  }
];

const createPasswordsTableQuery = `
CREATE TABLE IF NOT EXISTS passwords (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);`;

const passwordsData = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "password": "111",
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "password": "222",
  },
  {
    "id": 3,
    "name": "Clementine Bauch",
    "password": "333",
  }
];

const createProductsTableQuery = `
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY,
  category VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2),
  quantity INT
);`;

const productsData = [
  {
    "id": 1,
    "category": "necklace",
    "description": "silver necklace",
    "price": 100,
    "quantity": 2,
  },
  {
    "id": 2,
    "category": "necklace",
    "description": "gold necklace",
    "price": 200,
    "quantity": 2,
  }
];

const createSoldProductsTableQuery = `
CREATE TABLE IF NOT EXISTS sold_products (
  id INT PRIMARY KEY,
  productId INT,
  userId INT,
  date DATE,
  quantity INT
);`;

const soldProductsData = [
  {
    "id": 1,
    "productId": "1",
    "userId": "1",
    "date": "2023-07-24",
    "quantity": 1,
  }
];

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  con.query(`CREATE DATABASE IF NOT EXISTS ${myDatabase}`, function (err, result) {
    if (err) throw err;
    console.log("Database created");

    // After the database is created, call the createTable function for each table
    //createTable(createUsersTableQuery, usersData, "users");
    //createTable(createPasswordsTableQuery, passwordsData, "passwords");
    //createTable(createProductsTableQuery, productsData, "products");
    createTable(createSoldProductsTableQuery, soldProductsData, "sold_products");

    // Finally, close the connection after all operations are finished
    con.end();
  });
});
