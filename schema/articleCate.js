/*
 * @Author: xxiao
 * @Date: 2022-04-05 20:36:10
 * @Description: 文章列表规则定义
 */

const joi = require("joi");

const name = joi.string().required();
const alias = joi.string().alphanum().required();
const id = joi.number().integer().min(1).required();

const article_cate_schema = {
  body: {
    name,
    alias,
  },
};

const id_schema = {
  params: {
    id,
  },
};

const update_cate_schema = {
  body: {
    id,
    name,
    alias,
  },
};

module.exports = {
  article_cate_schema,
  id_schema,
  update_cate_schema,
};
