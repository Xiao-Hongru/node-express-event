/*
 * @Author: xxiao
 * @Date: 2022-04-03 10:11:25
 * @Description: 检查提交文章表单数据的类型
 */


const joi = require("joi");

const id = joi.number().integer().min(1).required();
const cate_id = joi.number().integer().min(1).required();
const title = joi.string().required();
const content = joi.string().required().allow("");
const state = joi.string().valid("已发布", "草稿").required();
const page = joi.number().integer().min(1).required();

const add_article_schema = {
  body: {
    title,
    cate_id,
    content,
    state,
  },
};

const get_article_list_schema = {
  query: {
    pagenum: page,
    pagesize: page,
    cate_id: joi.number().integer().allow(""),
    state: joi.string().allow("").valid("已发布", "草稿"),
  },
};

const article_id_schema = {
  params: {
    id,
  },
};

const edit_article_schema = {
  body: {
    id,
    title,
    cate_id,
    content,
    state,
  },
};

module.exports = {
  add_article_schema,
  get_article_list_schema,
  article_id_schema,
  edit_article_schema,
};
