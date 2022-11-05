const express = require("express");

const random = require("../user_solve/random.js")
const router = express.Router();
const {vaildation }=require("../user_solve/vaildate")



//获取验证码
router.get('/random',  random.RonDom)
//验证
router.post("/proving",vaildation,  random.Proving)


module.exports = router