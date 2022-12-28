const express = require("express");

const random = require("../user_solve/random.js")
const router = express.Router();
const { Proving }=require("../user_solve/vaildate")



//获取验证码
router.get('/random', Proving, random.RonDom)
//验证
router.post("/proving", Proving,  random.Proving)


module.exports = router