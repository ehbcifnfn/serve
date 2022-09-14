//导入模块
const express = require("express");

//用户处理函数
const User = require("../user_solve/user.js");
//创建路由对象
const router = express.Router();
//注册
router.post("/register", User.register);

//登录
router.post("/login", User.login);

//禁用用户
router.put("/binlogin", User.binlogin);

//删除用户
router.post("/deletuser", User.deletuser);

module.exports = router;
