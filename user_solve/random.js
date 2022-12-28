const db = require("../db/index.js");
const { num } = require('../config')

// 生成随机数
exports.RonDom = (req, res) => {
  arr = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 1, 2, 3, 4, 5, 6, 7, 8, 9]
  str = "";
  str1 = ''
  for (let i = 0; i < num; i++) {
    let rondomNumber = arr[Math.floor(Math.random() * 60)];
    str += rondomNumber;
  }
  console.log(Math.floor(Math.random() * 61))
  time1 = new Date().getTime();

  for (let j = 0; j <= Math.floor(Math.random() * 10); j++) {
    str1 += Math.floor(Math.random() * 10)
  }

  db.query('INSERT  INTO  new_table (num,time,idnum,status) VALUES (?,?,?,0)', [str, time1, str1], (err, resultes) => {
    if (err) {
      return res.send({
        msg: err,
        status: 400
      })
    }
    // console.log(resultes)

    return res.send({
      msg: "获取验证码成功",
      status: 200,
      data: {
        time: new Date().toLocaleString(),
        rondomNumber: str,
        idnum: str1,
        insertId: resultes.insertId - 1
      },
    });

  })

};
//验证随机数
exports.Proving = (req, res) => {
  const userproving = req.body;

  console.log(userproving)
  if (JSON.stringify(userproving) == '{}') {
    return res.send({
      status: 401,
      msg: "发送的验证码为空，请获取后在验证"

    })
  }
  // console.log(userproving)
  db.query("SELECT * FROM new_table", (err, resultes) => {
    if (err) {
      console.log(err)
    }
    //  console.log(resultes)
    console.log('时间' + (new Date().getTime() - resultes[userproving.index].time) / 1000)
    if (resultes[userproving.index].num == userproving.num && (new Date().getTime() - resultes[userproving.index].time) / 1000 <= 60 && resultes[userproving.index].idnum == userproving.idnum) {
      db.query('UPDATE new_table SET status=? where id=? ', [1, userproving.index + 1], (resultes, err) => {
        if (err) {
          return console.log(err)
        }
        console.log("插入成功" + resultes)
      })
      return res.send({
        status: 200,
        msg: "验证通过"
      })
    }

    if (resultes[userproving.index].num != userproving.num) {
      return res.send({
        status: 400,
        msg: '验证码错误'
      })
    }
    if (parseInt(new Date().getTime() - resultes[userproving.index].time) / 1000 > 60) {
      return res.send({
        status: 400,
        msg: '您已超时，请重试'
      })
    }

  })



}

