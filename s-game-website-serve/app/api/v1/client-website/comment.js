const Router = require("koa-router");
const { CommentDao } = require("../../../dao/comment");
const { ArticleDao } = require("../../../dao/article");
const { CreateCommentValidator, CreateReplyValidator, CreateAdviseValidator } = require("../../../validators/comment");
const { PositiveIdValidator } = require("../../../validators/common");

const m_Router = new Router({
  prefix: "/v1/client-website/comment"
});

m_Router.post("/normal", async ctx => {
    const v = await new CreateCommentValidator().validate(ctx);
    let commentId = await CommentDao.createComment(v);
    ctx.json(commentId);
  }
);

m_Router.post("/reply", async ctx => {
    const v = await new CreateReplyValidator().validate(ctx);
    let commentId = await CommentDao.createReply(v);
    ctx.json(commentId);
  }
);

m_Router.post("/advise", async ctx => {
    const v = await new CreateAdviseValidator().validate(ctx);
    await CommentDao.createAdvise(v);
    ctx.success({
      msg: "发表成功"
    });
  }
);

m_Router.get("/like-normal/:id", async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get("path.id");
    await CommentDao.updateCommentLikecount(id, 0);
    ctx.success({
      msg: "点赞成功"
    });
  }
);

m_Router.get("/hate-normal/:id", async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get("path.id");
    await CommentDao.updateCommentHatecount(id, 0);
    ctx.success({
      msg: "点踩成功"
    });
  }
);

m_Router.get("/like-reply/:id", async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get("path.id");
    await CommentDao.updateCommentLikecount(id, 1);
    ctx.success({
      msg: "点赞成功"
    });
  }
);

m_Router.get("/hate-reply/:id", async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get("path.id");
    await CommentDao.updateCommentHatecount(id, 1);
    ctx.success({
      msg: "点踩成功"
    });
  }
);

m_Router.get("/report-normal/:id", async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get("path.id");
    await CommentDao.updateCommentReportcount(id, 0);
    ctx.success({
      msg: "已举报"
    });
  }
);

m_Router.get("/report-reply/:id", async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get("path.id");
    await CommentDao.updateCommentReportcount(id, 1);
    ctx.success({
      msg: "已举报"
    });
  }
);

m_Router.get("/:id", async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdValidator().validate(ctx);
  // 获取文章ID参数
  const id = v.get("path.id");
  // 查询文章
  const comment = await CommentDao.getCommentList(id);
  // 返回结果
  ctx.response.status = 200;
  ctx.json(comment);
});

module.exports = m_Router;