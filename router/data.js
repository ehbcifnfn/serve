const express = require("express");
//创建路由对象
const router = express.Router();
const data = require("../user_solve/data.js");

router.get("/Ip", data.SendIp);

router.get('/random', data.RonDom)

router.post("/proving", data.Proving)

router.post('/ImgUpda', data.ImgUpda)
module.exports = router;
