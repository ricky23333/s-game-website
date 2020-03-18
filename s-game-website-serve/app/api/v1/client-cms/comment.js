'use strict';

const {
  LinRouter,
  NotFound,
  groupRequired,
  disableLoading,
  logger
} = require('lin-mizar');
const {getSafeParamId} = require('../../../libs/util');
const {
  CreateCommentValidator,
  GetCommentOrReplyListValidator,
  CreateReplyValidator,
} = require('../../../validators/comment');

const {PositiveIdValidator} = require('../../../validators/common');
const {CommentDao} = require('../../../dao/comment');

const commentApi = new LinRouter({
  prefix: '/v1/client-cms/comment'
});

const CommentDto = new CommentDao();

// commentApi.get('normal/:id', async ctx => {
//   const v = await new PositiveIdValidator().validate(ctx);
//   const id = v.get('path.id');
//   const date = await CommentDto.getc(id);
//   if (!date) {
//     throw new NotFound({
//       msg: '没有找到相关评论'
//     });
//   }
//   ctx.json(date);
// });

commentApi.linGet(
  'getComment',
  '/normal',
  {
    auth: '查看评论',
    module: '评论',
    mount: true
  },
  groupRequired,
  async ctx => {
    const v = await new GetCommentOrReplyListValidator().validate(ctx);
    const comments = await CommentDto.getCommentOrReplyOrAdviseListWithCms(v,0);
    ctx.json(comments);
  });

commentApi.linPost(
  'createComment',
  '/normal',
  {
    auth: '创建评论',
    module: '评论',
    mount: true
  },
  groupRequired,
  logger("{user.username}创建了评论"),
  async ctx => {
    const v = await new CreateCommentValidator().validate(ctx);
    await CommentDto.createOrUpdateCommentOrReplyWithCms(v,0,true);
    ctx.success({
      msg: '创建评论成功'
    });
  }
);

commentApi.linPut(
  'recoverComment',
  '/normal/recover',
  {
    auth: '恢复评论',
    module: '评论',
    mount: true
  },
  groupRequired,
  logger("{user.username}将评论从被删除列表恢复"),
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    await CommentDto.recoverCommentorReplyOrAdviseWithCms(v,0);
    ctx.success({
      msg: '恢复评论成功'
    });
  }
);

commentApi.linPut(
  'updateComment',
  '/normal/:id',
  {
    auth: '更新评论',
    module: '评论',
    mount: true
  },
  groupRequired,
  logger("{user.username}更新了评论"),
  async ctx => {
    const v = await new CreateCommentValidator().validate(ctx);
    const id = getSafeParamId(ctx);
    await CommentDto.createOrUpdateCommentOrReplyWithCms(v,0,false, id);
    ctx.success({
      msg: '更新评论成功'
    });
  }
);

commentApi.linDelete(
  'deleteComment',
  '/normal/:id',
  {
    auth: '删除评论',
    module: '评论',
    mount: true
  },
  groupRequired,
  logger("{user.username}删除了评论"),
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await CommentDto.deleteCommentOrReplyOrAdviseWithCms(id,0);
    ctx.success({
      msg: '删除评论成功'
    });
  }
);

commentApi.linGet(
  'getReply',
  '/reply',
  {
    auth: '查看回复',
    module: '回复',
    mount: true
  },
  groupRequired,
  async ctx => {
    const v = await new GetCommentOrReplyListValidator().validate(ctx);
    const comments = await CommentDto.getCommentOrReplyOrAdviseListWithCms(v,1);
    ctx.json(comments);
  });

commentApi.linPost(
  'createReply',
  '/reply',
  {
    auth: '创建回复',
    module: '回复',
    mount: true
  },
  groupRequired,
  logger("{user.username}创建了回复"),
  async ctx => {
    const v = await new CreateReplyValidator().validate(ctx);
    await CommentDto.createOrUpdateCommentOrReplyWithCms(v,1,true);
    ctx.success({
      msg: '创建回复成功'
    });
  }
);

commentApi.linPut(
  'recoverReply',
  '/reply/recover',
  {
    auth: '恢复回复',
    module: '回复',
    mount: true
  },
  groupRequired,
  logger("{user.username}将回复从被删除列表恢复"),
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    await CommentDto.recoverCommentorReplyOrAdviseWithCms(v,1);
    ctx.success({
      msg: '恢复回复成功'
    });
  }
);

commentApi.linPut(
  'updateReply',
  '/reply/:id',
  {
    auth: '更新回复',
    module: '回复',
    mount: true
  },
  groupRequired,
  logger("{user.username}更新了回复"),
  async ctx => {
    const v = await new CreateCommentValidator().validate(ctx);
    const id = getSafeParamId(ctx);
    await CommentDto.createOrUpdateCommentOrReplyWithCms(v,1,false, id);
    ctx.success({
      msg: '更新回复成功'
    });
  }
);

commentApi.linDelete(
  'deleteReply',
  '/reply/:id',
  {
    auth: '删除回复',
    module: '回复',
    mount: true
  },
  groupRequired,
  logger("{user.username}删除了回复"),
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await CommentDto.deleteCommentOrReplyOrAdviseWithCms(id,1);
    ctx.success({
      msg: '删除回复成功'
    });
  }
);

commentApi.linGet(
  'getAdvise',
  '/advise',
  {
    auth: '查看反馈',
    module: '反馈',
    mount: true
  },
  groupRequired,
  async ctx => {
    const v = await new GetCommentOrReplyListValidator().validate(ctx);
    const comments = await CommentDto.getCommentOrReplyOrAdviseListWithCms(v,2);
    ctx.json(comments);
  });

commentApi.linPut(
  'recoverAdvise',
  '/advise/recover',
  {
    auth: '恢复反馈',
    module: '反馈',
    mount: true
  },
  groupRequired,
  logger("{user.username}将反馈从被删除列表恢复"),
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    await CommentDto.recoverCommentorReplyOrAdviseWithCms(v,2);
    ctx.success({
      msg: '恢复反馈成功'
    });
  }
);

commentApi.linDelete(
  'deleteAdvise',
  '/advise/:id',
  {
    auth: '删除反馈',
    module: '反馈',
    mount: true
  },
  groupRequired,
  logger("{user.username}删除了反馈"),
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await CommentDto.deleteCommentOrReplyOrAdviseWithCms(id,2);
    ctx.success({
      msg: '删除反馈成功'
    });
  }
);
module.exports = {commentApi, [disableLoading]: false};