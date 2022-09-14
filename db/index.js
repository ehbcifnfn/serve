const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "new_schema", //那个数据库
});

db.connect((err) => {
  if (err) {
    return console.log(err);
  }
  console.log("success");
});
module.exports = db;
