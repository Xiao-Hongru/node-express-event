/*
 * @Author: xxiao
 * @Date: 2022-04-06 12:11:24
 * @Description: 文章分类路由
 */

const express = require("express");
const expressJoi = require("@escook/express-joi");
const handler = require("../router_handler/articleCate");
const {
  article_cate_schema,
  id_schema,
  update_cate_schema,
} = require("../schema/articleCate");

const router = express.Router();

// 获取文章分类
router.get("/cates", handler.getCateList);
// 新增文章分类
router.post("/addcates", expressJoi(article_cate_schema), handler.addCates);
// 根据id删除文章
router.get("/deletecate/:id", expressJoi(id_schema), handler.delecateCateById);
// 根据id获取分类
router.get("/cates/:id", expressJoi(id_schema), handler.getCateById);
// 根据id更新分类
router.post("/updatecate", expressJoi(update_cate_schema), handler.updateCateById);

module.exports = router;
