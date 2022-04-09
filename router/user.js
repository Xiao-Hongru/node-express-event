/*
 * @Author: xxiao
 * @Date: 2022-04-06 12:11:24
 * @Description: 登录注册路由
 */

const express = require("express");
const expressJoi = require("@escook/express-joi");
const userHandler = require("../router_handler/user");
const { reg_login_schema } = require("../schema/user");

const router = express.Router();

// 用户注册
router.post("/reguser", expressJoi(reg_login_schema), userHandler.reguser);
// 用户登录
router.post("/login", expressJoi(reg_login_schema), userHandler.login);

module.exports = router;
