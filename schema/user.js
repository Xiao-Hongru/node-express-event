/*
 * @Author: xxiao
 * @Date: 2022-04-09 11:52:31
 * @Description: 用户个人信息规则定义
 */

const joi = require("joi");

const id = joi.number().integer().min(1);
const username = joi.string().alphanum().max(10).min(1).required();
const email = joi.string().email().required();
const nickname = joi.string().required();
const avatar = joi.string().dataUri().required();
const password = joi
  .string()
  .required()
  .pattern(/^[\S]{6,12}$/);

const reg_login_schema = {
  body: {
    username,
    password,
  },
};

const userinfo_schema = {
  body: {
    id,
    nickname,
    email,
  },
};

const pwd_schema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref("oldPwd")).concat(password),
  },
};

const avatar_schema = {
  body: {
    avatar,
  },
};

module.exports = {
  reg_login_schema,
  userinfo_schema,
  pwd_schema,
  avatar_schema,
};
