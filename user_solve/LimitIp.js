const db = require("../db/index.js");
const { ipnum } = require("../config")
const axios = require("axios");




function limitip(req, res, next) {
    const ip = req.ip.replace(/[^\d '.']/g, "")
    // async function ajax() {
    //     const { data: results } = await axios({
    //         method: 'get',
    //         url: 'https://apis.map.qq.com/ws/location/v1/ip',
    //         params: { key: '6LDBZ-BF4HK-G2ZJA-ABCNH-3A44S-7OFZI', ip: ip }
    //     })
    //     // console.log(res)
    //     return results
    // }
    // ajax().then(res => {
    //     // console.log(res)

    // })
    console.log(`访问的IP:${req.ip.replace(/[^\d '.']/g, "")}`)

    // 每日零点时间戳
    //  new Date(new Date().toLocaleDateString()).getTime()
    //每个小时的时间戳
    const t1 = new Date(new Date().toLocaleDateString()).getTime() + 1000 * 60 * 60 * new Date().getHours()
    //     console.log(t1)
    //    console.log( new Date('2022-10-28 19:00:00').getTime())
    //    console.log(new Date().getTime())

    // console.log(new Date().toLocaleString())
    db.query('SELECT count(*) as number FROM ip WHERE adress=?and time>? ', [ip, t1], (err, results) => {
        if (err) {
            return res.send({
                status: 400,
                msg: err
            })
        }
        console.log(results[0].number)
        console.log(ipnum / 2)
        // if(results[0].number >= ipnum%2){
        //     return res.send({
        //         status:200,
        //         msg:'您已请求达到限制的一半',
        //         ipnum:results
        //     })
        // }
        if (results[0].number == ipnum / 2) {
            res.send({
                status: 4000,
                msg: "请求次数超过一半,请验证",
                ipnum: ipnum / 2
            })

        }
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