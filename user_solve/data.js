const db = require("../db/index.js");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config.js");
// 随机数位数
const { num } = require('../config')
const path = require("path")
const fs = require("fs");
const { time } = require("console");


//获取自己ip
exports.SendIp = (req, res) => {
  ip = req.ip.replace(/[^\d '.']/g, "");
  return res.send({
    status: 200,
    msg: "访问成功",
    ip: ip,
  });
};
// // 生成随机数
// exports.RonDom = (req, res) => {

//   str = "";
//   str1 = ''
//   for (let i = 0; i < num; i++) {
//     let rondomNumber = Math.floor(Math.random() * 10);
//     str += rondomNumber;
//   }
//   time1 = new Date().getTime();

//   for (let j = 0; j <= Math.floor(Math.random() * 10); j++) {
//     str1 += Math.floor(Math.random() * 10)
//   }

//   db.query('INSERT  INTO  new_table (num,time,idnum) VALUES (?,?,?)', [str, time1, str1], (err, resultes) => {
//     if (err) {
//       return res.send({
//         msg: err,
//         status: 400
//       })
//     }
//     // console.log(resultes)

//     return res.send({
//       msg: "获取验证码成功",
//       status: 200,
//       data: {
//         time: new Date().toLocaleString(),
//         rondomNumber: str,
//         idnum: str1,
//         insertId: resultes.insertId - 1
//       },
//     });

//   })

// };
// //验证随机数
// exports.Proving = (req, res) => {
//   const userproving = req.body;

//   console.log(userproving)
//   if (JSON.stringify(userproving) == '{}') {
//     return res.send({
//       status: 401,
//       msg: "发送的验证码为空，请获取后在验证"

//     })
//   }
//   // console.log(userproving)
//   db.query("SELECT * FROM new_table", (err, resultes) => {
//     if (err) {
//       console.log(err)
//     }
//     //  console.log(resultes)
//     console.log('时间' + (new Date().getTime() - resultes[userproving.index].time) / 1000)
//     if (resultes[userproving.index].num == userproving.num && (new Date().getTime() - resultes[userproving.index].time) / 1000 <= 60 && resultes[userproving.index].idnum == userproving.idnum) {
//       return res.send({
//         status: 200,
//         msg: "验证通过"
//       })
//     }

//     if (resultes[userproving.index].num != userproving.num) {
//       return res.send({
//         status: 400,
//         msg: '验证码错误'
//       })
//     }
//     if (parseInt(new Date().getTime() - resultes[userproving.index].time) / 1000 > 60) {
//       return res.send({
//         status: 400,
//         msg: '您已超时，请重试'
//       })
//     }

//   })



// }

//上传头像
exports.ImgUpda = (req, res) => {
  console.log(req.body)
  fs.readFile(req.file.path, (err, data) => {
    console.log(req.file);
    if (err) return res.send("上传失败");
    fs.writeFile("./img/" + req.file.originalname, data, (file, err) => {
      if (err)
        return res.send({
          msg: "写入失败",
          status: 400,

        });
      return res.send({
        msg: "写入成功",
        status: 200,
        url: 'http://127.0.0.1:90/img/' + req.file.originalname
      })
    }

    );
  })




}
//上传html,md文件
exports.files = (req, res) => {
  console.log(req.body)
  f1 = Math.floor(Math.random() * 10000)
  times = new Date().toLocaleString()
  if (req.body.https) {
    bool = 1
  }
  else {
    bool = 0
  }
  db.query("INSERT INTO user_html (time,img,title,bool,html,md) VALUES(?,?,?,?,?,?) ",
    [times, req.body.https, req.body.title, bool, req.body.html, req.body.md], (err, results) => {
      if (err) {
        console.log(err)
      }
      console.log(results)
    })


  //   fs.open('./file/'+f1+".md", 'a+', function (err, fd) {
  //     if (err) {
  //       return console.error(err);
  //     }
  //     console.log("文件打开成功！");
  //   });
  //   fs.writeFile('./file/' + f1 + ".md", req.body.md[0] , (err, file) => {
  //     if (err) { 
  //       console.log(err)
  //     }
  //     // console.log(file)
  //   })
  //   fs.open('./file/' + f1 + ".html", 'a+', function (err, fd) {
  //     if (err) {
  //       return console.error(err);
  //     }
  //     console.log("文件打开成功！");
  //   });
  //   fs.writeFile('./file/' + f1 + ".html", req.body.html[0], (err, file) => {
  //     if (err) {
  //       console.log(err)

  //     }
  //   })
}
//请求博客数据
exports.sharefile = (req, res) => {
  console.log(req.query)
  // console.log(JSON.stringify(req.query) == '{}')
  if (JSON.stringify(req.query) == '{}') {
    db.query("SELECT * FROM user_html", (err, results) => {
      if (err) {
        console.log(err)
        return
      }
      if (results.length >= 0) {
        console.log(results)
        res.send({
          msg: '查询成功',
          status: 200,
          data: results
        })
      }
    })
  } else {

    db.query("SELECT * FROM user_html LIMIT ?,?", [(req.query.Current - 1) * 10, 10], (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      console.log(results)
      res.send({
        msg: '查询成功',
        status: 200,
        data: results
      })
      // console.log(results)
    })
  }


}