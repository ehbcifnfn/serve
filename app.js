//创建服务器
const express = require("express");
const app = express();
const { secretKey } = require("./config");
const { expressjwt: jwt } = require("express-jwt");
//设置允许跨域
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//登录接口
const Login = require("./router/user.js");

//解析token
app.use(
  jwt({ secret: secretKey, algorithms: ["HS256"] }).unless({
    path: ["/login", "/register","/binlogin"],
  })
);

//报错
app.use((err, req, res, next) => {
  if (err.name == "UnauthorizedError") {
    return res.send({
      status: "401",
      message: "无效的token",
      err: err,
    });
  }
  res.send("未知错误");
});

//登录模块
app.use(Login);

app.listen(80, (res, err) => {
  console.log("serve服务器开启");
});
