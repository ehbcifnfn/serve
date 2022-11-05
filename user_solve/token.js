//报错

const expressJoi = require('express-joi-validator');
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


    // console.log(err)
    res.send("未知错误");
    next();
}
module.exports = ProvingToken;