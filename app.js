/*
 * @Author: xxiao
 * @Date: 2022-04-09 11:52:31
 * @Description: 大事件项目服务器
 */
const express = require("express");
const cors = require("cors");
const expressJwt = require("express-jwt");
const joi = require("joi");
const userRouter = require("./router/user");
const userInfoRouter = require("./router/userInfo");
const artCateRouter = require("./router/articleCate");
const articleRouter = require("./router/article");
const config = require("./config");

const app = express();

/**
 * 中间件
 */
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("./uploads"));
app.use(
  expressJwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] })
);
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

/**
 * 路由
 */
// 登录注册
app.use("/api", userRouter);
// 个人中心
app.use("/my", userInfoRouter);
// 文章分类
app.use("/my/article", artCateRouter);
// 文章管理
app.use("/my/article", articleRouter);

/**
 * 错误中间件
 */
app.use((err, req, res, next) => {
  // 数据验证错误
  if (err instanceof joi.ValidationError) return res.cc(err);
  // 身份认证错误
  if (err.name === "UnauthorizedError") return res.cc(err);
  // 其他
  return res.cc(err);
});

app.listen(3007, () => {
  console.log("express server running at http://127.0.0.1:3007");
});
