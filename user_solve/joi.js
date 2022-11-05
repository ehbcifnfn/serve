
const Joi = require('joi');

mail = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,10}$')).error(new Error("不合法")),
    username = Joi.string().alphanum().min(3).max(7).required().error(new Error("不合法")),
    index = Joi.number().integer().error(new Error("不合法")),
    idnum = Joi.number().integer().error(new Error("不合法")),
    randomNumber = Joi.number().integer().error(new Error("不合法")),


exports.login = Joi.object({
//email
    Email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).error(new Error("邮箱不合法")),
 //密码
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,10}$')).required().error(new Error("密码不合法")),
 //用户名
    username: Joi.string().alphanum().min(3).max(7).required().error(new Error("用户名不合法")),
 //验证码索引
    index: Joi.number().integer().error(new Error("index不合法")),
 //整数   
    idnum: Joi.number().integer().error(new Error("idnum不合法")),
 //随机数
    randomNumber: Joi.number().integer().error(new Error("randomNumber不合法")),
//


})