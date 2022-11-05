const { login } = require("../user_solve/joi")
const Joi = require("joi")
exports.vaildation = async (req, res, next) => {
    try {
        const value = await login.validateAsync(req.body)
        // const value2=await fordate.validateAsync(req.body)
        console.log("value:" + value)
        next()
    }
    catch (err) {
         console.log("数据校验出错"+(err))
        res.send({
            status: 1,
            msg: err instanceof Error ? err.message : err,
        })
    }
}