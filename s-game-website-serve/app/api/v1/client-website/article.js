const Router = require("koa-router");
const { ArticleDao } = require("../../../dao/article");
const { CommentDao } = require("../../../dao/comment");
const { PositiveIdValidator } = require("../../../validators/common");

const m_Router = new Router({
  prefix: "/v1/client-website/article"
});

m_Router.get("/list", async (ctx) => {
  // 获取页码，排序方法，分类ID，搜索关键字
  const { page, perPageCount, desc, main_type, child_type, keyword } = ctx.query;
  // 查询文章列表
  const articleList = await ArticleDao.getArticleList(page, parseInt(perPageCount), desc, main_type, child_type, keyword);
  // 返回结果
  ctx.response.status = 200;
  ctx.json(articleList);
});

m_Router.get("/hot-list", async (ctx) => {
  const { main_type, child_type } = ctx.query;
  // 查询文章列表
  const articleList = await ArticleDao.getHotArticleList(main_type, child_type);
  // 返回结果
  ctx.response.status = 200;
  ctx.json(articleList);
});

m_Router.get("/search", async (ctx) => {
  const { page, perPageCount, desc, main_type, child_type, keyword } = ctx.query;
  const articleList = await ArticleDao.getArticleList(page, parseInt(perPageCount), desc, main_type, child_type, keyword);
  // 返回结果
  ctx.response.status = 200;
  ctx.json(articleList);
});

m_Router.get("/special", async (ctx) => {
  // 获取关于、用户协议等特殊类型的文章
  const {  main_type } = ctx.query;
  const article = await ArticleDao.getSpecialArticleDetail(main_type);
  // 返回结果
  ctx.response.status = 200;
  ctx.json(article);
});

m_Router.get("/like/:id", async (ctx) => {
  const v = await new PositiveIdValidator().validate(ctx);
  // 获取文章ID参数
  const id = v.get("path.id");
  // 查询文章
  await ArticleDao.updateArticleLikecount(id);
  // 返回结果
  ctx.success({
    msg: "点赞成功"
  });
});

m_Router.get("/:id", async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdValidator().validate(ctx);
  // 获取文章ID参数
  const id = v.get("path.id");
  // 查询文章
  const article = await ArticleDao.getArticleDetail(id);
  article.comment_date = await CommentDao.getCommentList(article);
  // 返回结果
  ctx.response.status = 200;
  ctx.json(article);
});
module.exports = m_Router;