//创建服务器
const express = require("express");
const app = express();
const { secretKey } = require("./config");
const { expressjwt: jwt } = require("express-jwt");
const path = require("path")
const rateLimit = require('express-rate-limit')
const { ipnum } = require("./config")

const limitip = require("./user_solve/LimitIp")

//设置允许跨域
const cors = require("cors");

app.use(limitip)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors());
//限制请求次数
const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 15 minutes
  max: ipnum, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: true, // Disable the `X-RateLimit-*` headers
  message: '请求过于频繁已加入黑名单',
})

app.use(limiter)
app.use(express.static(path.join(__dirname, '/img')))

//登录接口
const Login = require("./router/user.js");
const data = require("./router/data.js");

// 解析token
// app.use(
//   jwt({ secret: secretKey, algorithms: ["HS256"] }).unless({
//     path: ["/login", "/register", '/Ip', '/rondom'],
//   })
// );

//报错
app.use((err, req, res, next) => {
  if (err.message == "invalid_token") {
    return res.send({
      status: "401",
      message: "token无效",
      err: err,
    });
  }
  if (err.message == "jwt expired") {
    return res.send({
      status: "5000",
      msg: "token过期",
    });
  }
  res.send("未知错误");
  next();
});

//登录模块
app.use(Login);
app.use(data);

app.listen(80, (res, err) => {
  console.log("serve服务器开启");
});
