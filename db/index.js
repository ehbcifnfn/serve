const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "new_schema", //哪个数据库
});

db.connect((err) => {
  if (err) {
    return console.log(err);
  }
  console.log("mysql服务success");
});
module.exports = db;
