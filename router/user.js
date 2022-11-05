//导入模块
const express = require("express");

//用户处理函数
const User = require("../user_solve/user.js");
//限制函数
const limitip = require("../user_solve/LimitIp.js")

const {vaildation }=require("../user_solve/vaildate")

//创建路由对象
const router = express.Router();
//注册
router.post("/register", limitip,vaildation , User.register);

//登录
router.post("/login", vaildation , limitip, User.login);

//禁用用户
router.put("/binlogin", limitip,vaildation , User.binlogin);

//删除用户
router.post("/deletuser",  limitip,vaildation , User.deletuser);

module.exports = router;
