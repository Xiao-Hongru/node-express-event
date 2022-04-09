/*
 * @Author: xxiao
 * @Date: 2022-04-03 10:11:25
 * @Description: 用户信息处理函数
 */

const db = require("../database/index");
const bcrypt = require("bcryptjs");

const getUserinfo = (req, res) => {
  // 利用token解码查询
  const id = req.user.id;
  const sql =
    "SELECT id, username, nickname, email, user_pic FROM ev_users WHERE id = ?";

  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("用户信息查询失败");

    return res.send({
      status: 0,
      message: "用户信息查询成功",
      data: results[0],
    });
  });
};

const updateInfo = (req, res) => {
  const sql = "UPDATE ev_users SET ? WHERE id = ?";

  db.query(sql, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("用户信息更新失败");

    return res.send({
      status: 0,
      message: "用户信息更新成功",
    });
  });
};

const updatePwd = (req, res) => {
  // 验证旧密码
  const id = req.user.id;
  const searchSql = "SELECT password FROM ev_users WHERE id = ?";

  db.query(searchSql, id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("用户密码更新失败");
    if (!bcrypt.compareSync(req.body.oldPwd, results[0].password)) {
      return res.cc("密码输入错误");
    }

    const password = bcrypt.hashSync(req.body.newPwd, 9);
    const sql = "UPDATE ev_users SET password = ? WHERE id = ?";

    db.query(sql, [password, id], (err, results) => {
      if (err) return res.cc(err);

      if (results.affectedRows !== 1) return res.cc("用户密码更新失败");

      return res.send({
        status: 0,
        message: "用户密码更新成功",
      });
    });
  });
};

const updateAvatar = (req, res) => {
  const avatar = req.body.avatar;
  const id = req.user.id;
  const sql = "UPDATE ev_users SET user_pic = ? WHERE id = ?";

  db.query(sql, [avatar, id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("更新头像失败");

    return res.send({
      status: 0,
      message: "更新成功",
    });
  });
};

module.exports = {
  getUserinfo,
  updateInfo,
  updatePwd,
  updateAvatar,
};
