
const Joi = require('joi');

// mail = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
//     password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,10}$')).error(new Error("不合法")),
//     username = Joi.string().alphanum().min(3).max(7).required().error(new Error("不合法")),
//     index = Joi.number().integer().error(new Error("不合法")),
//     idnum = Joi.number().integer().error(new Error("不合法")),
//     randomNumber = Joi.number().integer().error(new Error("不合法")),


exports.login = Joi.object({
   //email
   Email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).error(new Error("邮箱不合法")),
   //密码 /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,10}$')).required(),
   //用户名
   username: Joi.string().alphanum().min(3).max(7).required(),


})

exports.Proving = Joi.object({
   // 验证码索引
   index: Joi.number().integer().error(new Error("index不合法")),
   //整数   
   idnum: Joi.number().integer().error(new Error("idnum不合法")),
   //随机数
   num: Joi.string().error(new Error("Bearer不合法")),
})