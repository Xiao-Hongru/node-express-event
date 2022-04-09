/*
 * @Author: xxiao
 * @Date: 2022-04-06 12:11:24
 * @Description: 文章分类处理函数
 */

const db = require("../database/index");

const getCateList = (req, res) => {
  const sql = "SELECT * FROM ev_article_cate WHERE is_delete = 0";

  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    if (results.length < 1) return res.cc("没有文章分类列表");

    return res.send({
      status: 0,
      message: "获取文章分类列表成功！",
      data: results,
    });
  });
};

const addCates = (req, res) => {
  // 检查分类名和别名是否重复
  const selectSql =
    "SELECT * FROM ev_article_cate WHERE (name = ? OR alias = ?) AND is_delete = 0 ";

  db.query(selectSql, [req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc("新增文章分类失败");
    if (results.length > 0) return res.cc("分类名或别称与已有文章列表重复");

    const insertSql = "INSERT INTO ev_article_cate SET ?";
    db.query(insertSql, req.body, (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc("新增文章分类失败");

      return res.cc("新增文章分类成功！", 0);
    });
  });
};

const delecateCateById = (req, res) => {
  const id = req.params.id;
  const updateSql = "UPDATE ev_article_cate SET is_delete = 1 WHERE id = ?";

  db.query(updateSql, id, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("删除文章分类失败");

    return res.send({
      status: 0,
      message: "删除文章分类成功",
    });
  });
};

const getCateById = (req, res) => {
  const id = req.params.id;
  const selectSql =
    "SELECT * FROM ev_article_cate WHERE id = ? AND is_delete =0";

  db.query(selectSql, id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("未找到具体信息");

    return res.send({
      status: 0,
      message: "获取文章分类数据成功！",
      data: results[0],
    });
  });
};

const updateCateById = (req, res) => {
  const id = req.body.id;
  const selectSql = `SELECT * FROM ev_article_cate WHERE id = ${id} AND is_delete = 0`;

  db.query(selectSql, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("更新分类信息失败");

    // 更新分类信息
    const updateSql = "UPDATE ev_article_cate SET ? WHERE id = ?";
    db.query(updateSql, [req.body, id], (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc("更新分类信息失败");

      return res.cc("更新分类信息成功！", 0);
    });
  });
};

module.exports = {
  getCateList,
  addCates,
  delecateCateById,
  getCateById,
  updateCateById,
};
