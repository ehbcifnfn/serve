const { object } = require("joi");

//报错
function ProvingToken(err, req, res, next) {

    if (err.message == 'invalid token') {
        return res.send({
            status: "401",
            message: "token无效",
            err: err,
        });
    }
    if (err.message == "jwt expired") {
        return res.send({
            status: "5000",
            msg: "token过期",
            err: err
        });
    }
    if (typeof (err) == 'object') {
        return res.send({
            status: 400,
            msg: 'token格式不对',
            err: err instanceof Error ? err.message : err
        })
    }


    console.log(typeof (err)=='object')
    res.send("未知错误");
    next();
}
module.exports = ProvingToken;