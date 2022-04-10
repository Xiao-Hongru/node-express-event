/*
 * @Author: xxiao
 * @Date: 2022-04-06 12:11:24
 * @Description: 文章管理处理函数
 */

const path = require("path");
const db = require("../database");

const addArticle = (req, res) => {
  if (req.file?.fieldname !== "cover_img") return res.cc("请上传文章封面");

  const articleInfo = {
    cover_img: path.join("/uploads", req.file.filename),
    pub_date: new Date(),
    author_id: req.user.id,
    ...req.body,
  };
  const sql = "INSERT INTO ev_articles SET ?";

  db.query(sql, articleInfo, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("添加文章失败");

    return res.cc("发布文章成功！", 0);
  });
};

const getArticleList = (req, res) => {
  const { pagenum, pagesize, cate_id, state } = req.query || {};

  // SQL语句
  const cateSql = cate_id ? ` && cate_id = ${cate_id}` : "";
  const stateSql = state ? ` && state = ${state}` : "";
  let whereSql = " WHERE is_delete = 0 " + cateSql + stateSql;
  let limitSql = ` LIMIT ${(pagenum - 1) * pagesize} , ${pagesize}`;

  const selectSql = "SELECT * FROM ev_articles" + whereSql + limitSql;
  const countSql = "SELECT count(*) as total FROM ev_articles" + whereSql;

  // 分别查找文章总数、文章列表
  let count = 0;
  let results = {};
  const done = (key, value) => {
    results[key] = value;
    count++;
    if (count === 2) {
      return res.send({
        status: 0,
        message: "获取文章列表成功！",
        data: results.data,
        total: results.total,
      });
    }
  };

  db.query(countSql, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("错误");
    done("total", results[0].total);
  });
  db.query(selectSql, (err, data) => {
    if (err) return res.cc(err);
    done("data", data);
  });
};

const deleteArticleById = (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE ev_articles SET is_delete = 1 WHERE id = ?";

  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("删除文章失败");

    return res.cc("删除成功！", 0);
  });
};

const getArticleById = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM ev_articles WHERE id = ?";

  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("获取文章失败");
    return res.send({
      status: 0,
      message: "查询成功",
      data: results[0],
    });
  });
};

const editArticleById = (req, res) => {
  if (req.file?.fieldname !== "cover_img") return res.cc("请上传文章封面");

  const articleInfo = {
    cover_img: path.join("/uploads", req.file.filename),
    pub_date: new Date(),
    author_id: req.user.id,
    ...req.body,
  };
  const id = req.body.id;
  const sql = "UPDATE ev_articles SET ? WHERE id = ?";

  db.query(sql, [articleInfo, id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("添加文章失败");
    return res.cc("发布文章成功！", 0);
  });
};

module.exports = {
  addArticle,
  getArticleList,
  deleteArticleById,
  getArticleById,
  editArticleById,
};
