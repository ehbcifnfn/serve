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
    if (err.message == "No authorization token was found") {
        return res.send({
            status: '401',
            msg: 'token不能为空',
            err: err
        })
    }
    res.send("未知错误");
    next();
}
module.exports = ProvingToken;