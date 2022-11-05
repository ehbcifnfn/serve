const db = require("../db/index.js");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config.js");
const md5 = require("md5");
const {ipnum }= require('../config')


//注册模块
exports.register = (req, res) => {
  console.log(req.body);
  const UserInfo = req.body;
  if (!UserInfo.username) {
    return res.send({
      status: 400,
      msg: "用户名不能为空",
    });
  }

  const sql = `select * from user where username = '${UserInfo.username}'`;
  // 'SELECT * FROM `user` WHERE `username` = ? '

  db.query(sql, (err, results, fields) => {
    if (err) {
      console.log(1);
      return res.send({
        status: 400,
        msg: err.message,
      });
    }
    if (results.length > 0) {
      // console.log(2);
      console.log(results);
      return res.send({
        status: 0,
        msg: "用户名被占用,请重新注册",
      });
    }

    db.query(
      "INSERT INTO user (username,password,status,time,Email)VALUES (?,?,?,?,?)",
      [
        UserInfo.username,
        md5(UserInfo.password),
        0,
        new Date().toLocaleString(),
        UserInfo.Email,
      ],
      (err, results) => {
        if (err) {
          return res.send({
            status: 400,
            msg: err.message,
          });
        }
        console.log(results);
        if (results.affectedRows == 1) {
          return res.send({
            status: 200,
            msg: "注册成功！",
          });
        }
      }
    );
  });
};

//用户登录模块
exports.login = (req, res) => {
  const UserInfo1 = req.body;
   console.log(UserInfo1);
  const sql1 = `select * from user where username = '${UserInfo1.username}'   `;
  db.query(sql1, (err, results, fields) => {
    if (err) {
      // console.log(1);
      return res.send({
        status: 400,
        msg: err.message,
      });
    }
    //  console.log(results.length);
    if (results.length == 0) {
      return res.send({
        status: 403,
        msg: "用户不存在",
      });
    }
    if (results.length > 0) {
      // console.log(2);
      // console.log(results);
      // exports.results[0].id
      if (results[0].status == 1) {
        return res.send({
          status: 500,
          msg: "用户被禁用！",
        });
      }
      // console.log(results[0].password === md5(UserInfo1.password));

      if (results[0].password === md5(UserInfo1.password) && results[0].username == UserInfo1.username) {
        let token = jwt.sign(
          {
            username: UserInfo1.username,
            id: results[0].id,
            ip: req.ip.replace(/[^\d '.']/g, ""),
          },
          secretKey,
          {
            expiresIn: "24h",
          }
        );


        return res.send({
          status: 200,
          msg: "登录成功！",
          token: token,
          id: results[0].id,
        });
      } else {
        return res.send({
          status: 403,
          msg: "密码错误！",
        });
      }
    }
  });
};
//禁用用户
exports.binlogin = (req, res) => {
  const UserInfo2 = req.body;
  console.log(UserInfo2);
  //

  db.query(
    "SELECT * FROM user WHERE username=?",
    UserInfo2.username,
    (err, results) => {
      if (err) {
        return res.send({
          status: 400,
          msg: err.message,
        });
      }
      if (results.length == 0) {
        return res.send({
          status: 403,
          msg: "用户不存在",
        });
      }
      if (results.length > 0) {
        console.log(results);
        db.query(
          // `update user set 'status=${1}' where 'username=${UserInfo2.username}'`,
          "UPDATE user SET status=? WHERE username = ?",
          [UserInfo2.status, UserInfo2.username],

          (err, results) => {
            if (err) {
              return res.send({
                status: 400,
                msg: err.message,
              });
            }
            if (results.affectedRows == 1) {
              return res.send({
                status: 200,
                msg: "更新成功",
                data: req.auth,
              });
            }
          }
        );
      }
    }
  );
};

//删除用户
exports.deletuser = (req, res) => {

  console.log(req.body);
  const UserInfo3 = req.body;
  if (!UserInfo3.username) {
    return res.send({
      status: 400,
      msg: "用户名不能为空",
    });
  }
  db.query(
    "SELECT * FROM user WHERE username=?",
    UserInfo3.username,
    (err, results) => {
      if (err) {
        return res.send({
          status: 400,
          msg: err.message,
        });
      }
      if (results.length === 0) {
        return res.send({
          status: 403,
          msg: "用户不存在",
        });
      }
      if (results.length > 0) {
        db.query(
          "DELETE FROM user WHERE username=?",
          UserInfo3.username,
          (err, results) => {
            if (err) {
              return res.send({
                status: 400,
                msg: err.message,
              });
            }
            return res.send({
              status: 200,
              msg: "删除成功",
            });
          }
        );
      }
    }
  );
};


