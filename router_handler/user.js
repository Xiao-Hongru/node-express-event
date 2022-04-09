/*
 * @Author: xxiao
 * @Date: 2022-04-03 10:11:25
 * @Description: 用户登录、注册接口处理函数
 */

const db = require("../database/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const reguser = (req, res) => {
  const username = req.body?.username;
  let password = req.body?.password;
  const sqlStr = "SELECT * FROM ev_users WHERE username = ?";

  db.query(sqlStr, username, (error, results) => {
    if (error) return res.cc(error);
    if (results.length > 0) return res.cc("用户名重复，请更换用户名");

    // 密码加密
    password = bcrypt.hashSync(password, 9);

    const insertStr = "INSERT INTO ev_users SET ?";
    db.query(insertStr, { username, password }, (err, result) => {
      if (err) return res.cc(err);
      if (result.affectedRows !== 1) return res.cc("注册失败，请稍后再试");
      return res.send({ status: 0, message: "注册成功" });
    });
  });
};

const login = (req, res) => {
  const userInfo = req.body;
  const sqlStr = "SELECT * FROM ev_users WHERE username = ?";

  db.query(sqlStr, userInfo.username, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("登录失败");

    // 密码验证
    if (!bcrypt.compareSync(userInfo.password, results[0].password)) {
      return res.cc("密码错误");
    }

    // 生成token
    const user = { ...results[0], password: "", user_pic: "" };
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn,
    });

    return res.send({
      status: 0,
      message: "登录成功",
      token: "Bearer " + tokenStr,
    });
  });
};

module.exports = {
  reguser,
  login,
};
