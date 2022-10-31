//创建服务器
const express = require("express");
const app = express();
const { secretKey } = require("./config");
const { expressjwt: jwt } = require("express-jwt");
const path = require("path")
const rateLimit = require('express-rate-limit')
const { ipnum } = require("./config")
//错误处理
const ProvingToken = require("./user_solve/token")
//登录，注册 接口
const Login = require("./router/user.js");
const data = require("./router/data.js");

//代理
const { createProxyMiddleware } = require("http-proxy-middleware");

const limitip = require("./user_solve/LimitIp")

//设置允许跨域
const cors = require("cors");
app.use(cors());
app.use(limitip)
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://way.jd.com/he/freeweather",
    changeOrigin: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

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



// 解析token
// app.use(
//   jwt({ secret: secretKey, algorithms: ["HS256"] }).unless({
//     path: ["/login", "/register", '/Ip'],
//   })
// );


//登录模块
app.use(Login);

app.use(data);





//错误中间件处理在最后
app.use(ProvingToken)

app.listen(80, (res, err) => {
  console.log("serve服务器开启");
});
