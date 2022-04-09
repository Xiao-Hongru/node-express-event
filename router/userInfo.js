/*
 * @Author: xxiao
 * @Date: 2022-04-06 12:11:24
 * @Description: 用户信息路由
 */

const express = require("express");
const expressJoi = require("@escook/express-joi");
const router = express.Router();
const handler = require("../router_handler/userInfo");
const {
  userinfo_schema,
  pwd_schema,
  avatar_schema,
} = require("../schema/user");

// 查询用户信息
router.get("/userinfo", handler.getUserinfo);
// 更新用户基本信息
router.post("/userinfo", expressJoi(userinfo_schema), handler.updateInfo);
// 重置密码
router.post("/updatepwd", expressJoi(pwd_schema), handler.updatePwd);
// 更新用户头像
router.post("/update/avatar", expressJoi(avatar_schema), handler.updateAvatar);

module.exports = router;
