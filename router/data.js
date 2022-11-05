const express = require("express");
//创建路由对象
const router = express.Router();
const data = require("../user_solve/data.js");
//限制函数
const limitip =require("../user_solve/LimitIp.js")
//数据校验
const expressJoi = require('express-joi-validator');
const {formdate}=require("../user_solve/joi")

router.get("/Ip",limitip, data.SendIp);


router.post('/ImgUpda', data.ImgUpda)
module.exports = router;
