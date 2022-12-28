const express = require("express");
//创建路由对象
const router = express.Router();
const data = require("../user_solve/data.js");
//限制函数
const limitip = require("../user_solve/LimitIp.js")
//数据校验
const expressJoi = require('express-joi-validator');
const { formdate } = require("../user_solve/joi")

const path = require("path")
//图像
const multer = require("multer");
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    },
});

const img = multer({ storage: storage });

router.get("/Ip", limitip, data.SendIp);


router.post('/ImgUpda', img.single("test"), data.ImgUpda)
router.post("/files", data.files)
router.get("/sharefile",data.sharefile)
module.exports = router;
