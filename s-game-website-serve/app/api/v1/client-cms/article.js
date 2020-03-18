"use strict";
const {
  LinRouter,
  NotFound,
  groupRequired,
  disableLoading,
  logger
} = require("lin-mizar");
const { getSafeParamId } = require("../../../libs/util");
const {
  GetArticleListValidator,
  ArticleSearchValidator,
  CreateOrUpdateArticleValidator,
  GetArticleValidator,
  RecoverArticleValidator
} = require("../../../validators/article");

const { PositiveIdValidator } = require("../../../validators/common");
const { ArticleNotFound } = require("../../../libs/err-code");
const { ArticleDao } = require("../../../dao/article");

const articleApi = new LinRouter({
  prefix: "/v1/client-cms/article"
});

const articleDto = new ArticleDao();

articleApi.get("/:id", async ctx => {
  const v = await new GetArticleValidator().validate(ctx);
  const id = v.get("path.id");
  const article = await articleDto.getArticleDetailWithCms(id, v);
  if (!article) {
    throw new NotFound({
      msg: "没有找到相关文章"
    });
  }
  ctx.json(article);
});

articleApi.linGet(
  "getArticle",
  "/",
  {
    auth: "查看文章",
    module: "文章",
    mount: true
  },
  groupRequired,
  async ctx => {
    const v = await new GetArticleListValidator().validate(ctx);
    const articles = await articleDto.getArticleListWithCms(v);
    ctx.json(articles);
  });

articleApi.linPost(
  "createArticle",
  "/",
  {
    auth: "创建文章",
    module: "文章",
    mount: true
  },
  groupRequired,
  logger("{user.username}创建了文章"),
  async ctx => {
    const v = await new CreateOrUpdateArticleValidator().validate(ctx);
    await articleDto.createArticle(v);
    ctx.success({
      msg: "创建文章成功"
    });
  }
);

articleApi.linPut(
  "recoverArticle",
  "/recover",
  {
    auth: "恢复文章",
    module: "文章",
    mount: true
  },
  groupRequired,
  logger("{user.username}将文章从被删除列表恢复"),
  async ctx => {
    const v = await new RecoverArticleValidator().validate(ctx);
    await articleDto.recoverArticle(v);
    ctx.success({
      msg: "恢复文章成功"
    });
  }
);

articleApi.linPut(
  "updateArticle",
  "/:id",
  {
    auth: "更新文章",
    module: "文章",
    mount: true
  },
  groupRequired,
  logger("{user.username}更新了文章内容"),
  async ctx => {
    const v = await new CreateOrUpdateArticleValidator().validate(ctx);
    const id = getSafeParamId(ctx);
    await articleDto.updateArticle(v, id);
    ctx.success({
      msg: "更新文章成功"
    });
  }
);

articleApi.linDelete(
  "deleteArticle",
  "/:id",
  {
    auth: "删除文章",
    module: "文章",
    mount: true
  },
  groupRequired,
  logger("{user.username}删除了文章"),
  async ctx => {
    const v = await new GetArticleValidator().validate(ctx);
    const id = v.get("path.id");
    await articleDto.deleteArticle(v, id);
    ctx.success({
      msg: "删除文章成功"
    });
  }
);


module.exports = { articleApi, [disableLoading]: false };
