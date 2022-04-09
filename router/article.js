/*
 * @Author: xxiao
 * @Date: 2022-04-06 12:11:24
 * @Description: 文章管理路由
 */

const path = require("path");
const express = require("express");
const multer = require("multer");
const expressJoi = require("@escook/express-joi");
const article_handler = require("../router_handler/article");
const {
  add_article_schema,
  get_article_list_schema,
  article_id_schema,
  edit_article_schema,
} = require("../schema/article");

const router = express.Router();

// 上传文件路径
const upload = multer({ dest: path.join(__dirname, "../uploads/") });

// 发布新文章
router.post(
  "/add",
  upload.single("cover_img"),
  expressJoi(add_article_schema),
  article_handler.addArticle
);

// 获取文章列表
router.get(
  "/list",
  expressJoi(get_article_list_schema),
  article_handler.getArticleList
);

// 根据id删除文章
router.get(
  "/delete/:id",
  expressJoi(article_id_schema),
  article_handler.deleteArticleById
);

// 根据id查找文章
router.get(
  "/:id",
  expressJoi(article_id_schema),
  article_handler.getArticleById
);

// 根据id更新文章
router.post(
  "/edit",
  upload.single("cover_img"),
  expressJoi(edit_article_schema),
  article_handler.editArticleById
);

module.exports = router;
