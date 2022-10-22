const db = require("../db/index.js");
const { ipnum } = require("../config")

function limitip(req, res, next) {
    const ip = req.ip.replace(/[^\d '.']/g, "")
    console.log(`访问的IP:${req.ip.replace(/[^\d '.']/g, "")}`)

    // 每日零点时间戳

    const t1 = new Date(new Date().toLocaleDateString()).getTime()

    // console.log(new Date().toLocaleString())
    db.query('SELECT count(*) as number FROM ip WHERE adress=?and time>? ', [ip, t1], (err, results) => {
        if (err) {
            return res.send({
                status: 400,
                msg: err
            })
        }
        console.log(results)

        if (results[0].number > ipnum) {

        }
        else {
            //插入ip相关信息
            db.query("INSERT INTO ip (adress,time,status) VALUES (?,?,?)", [ip, new Date().getTime(), 0], (err, results) => {
                if (err) {
                    return res.send({
                        status: 400,
                        msg: err
                    })
                }
                //  console.log(results)


            })
            next()
        }
    }


    )





}




module.exports = limitip