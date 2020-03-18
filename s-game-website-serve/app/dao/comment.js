const { Op, Sequelize } = require("sequelize");
const { Comment } = require("../models/comment");
const { CommentAdvise } = require("../models/comment-advise");
const { CommentReply } = require("../models/comment-reply");
const { ArticleDao } = require("../dao/article");

const {
  ParametersException,
  NotFound,
  UserAdmin,
  Forbidden,
  findMetaByAuth,
  unsets
} = require("lin-mizar");

//DAO处理api传递过来的数据，并修改数据库
class CommentDao {
  static transformCommentDate(date, isCmsDate) {
    let tempDate = {};
    tempDate.id = date.id;
    tempDate.nickname = date.nickname;
    tempDate.head_icon_id = date.head_icon_id;
    tempDate.content = date.content;
    tempDate.article_id = date.article_id;
    tempDate.likecount = date.likecount;
    tempDate.hatecount = date.hatecount;
    tempDate.cover_text = date.cover_text;
    tempDate.create_at = date.create_time;

    if (isCmsDate) {
      tempDate.update_at = date.update_time;
      tempDate.delete_at = date.delete_time;
      tempDate.email = date.email;
    }
    return tempDate;
  }

  static transformReplyDate(date, isCmsDate) {
    let tempDate = {};
    tempDate.id = date.id;
    tempDate.nickname = date.nickname;
    tempDate.head_icon_id = date.head_icon_id;
    tempDate.content = date.content;
    tempDate.article_id = date.article_id;
    tempDate.likecount = date.likecount;
    tempDate.hatecount = date.hatecount;
    tempDate.cover_text = date.cover_text;
    tempDate.parent_comment_id = date.parent_comment_id;
    tempDate.reply_user_name = date.reply_user_name;
    tempDate.create_at = date.create_time;
    if (isCmsDate) {
      tempDate.update_at = date.update_time;
      tempDate.delete_at = date.delete_time;
      tempDate.email = date.email;
    }
    return tempDate;
  }

  static transformAdviseDate(date) {
    return {
      id: date.id,
      nickname: date.nickname,
      email: date.nickname,
      content: date.content,
      create_at: date.create_time,
      update_at: date.update_time,
      delete_at: date.delete_time
    };
  }

  static async getCommentList(articleDate) {
    let filter = {};
    if (articleDate.id) {
      filter.article_id = articleDate.id;
    }

    let commentList = await Comment.findAndCountAll({
      where: filter,
      order: [
        ["likecount", "DESC"],
        ["id", "DESC"]
      ]
    });

    if (!commentList) {
      throw new NotFound({
        msg: "无法获取ID为" + id + "的文章的评论"
      });
    }

    let tempDate = {};
    tempDate.date = [];

    if (commentList.rows) {
      for (let i = 0; i < commentList.rows.length; i++) {
        let item = commentList.rows[i];
        let tempItem = CommentDao.transformCommentDate(item, false);
        tempItem.reply_list = await CommentDao.getReplyList(tempItem);
        tempDate.date.push(tempItem);
      }
    }

    return tempDate;
  }

  static async getReplyList(parentCommentDate) {
    let filter = {};
    if (parentCommentDate.id) {
      filter.parent_comment_id = parentCommentDate.id;
    }

    let replyList = await CommentReply.findAndCountAll({
      where: filter,
      order: [
        ["create_time", "DESC"]
      ]
    });

    if (!replyList) {
      throw new NotFound({
        msg: "无法获取ID为" + id + "的评论的回复"
      });
    }

    let tempDate = [];

    if (replyList.rows) {
      replyList.rows.forEach((item) => {
        let tempItem = CommentDao.transformReplyDate(item, false);
        tempItem.reply_list = [];
        tempDate.push(tempItem);
      });
    }

    return tempDate;
  }

  async getCommentOrReplyOrAdviseListWithCms(v, type) {
    let page = v.get("query.page");
    let desc = v.get("query.desc") ? v.get("query.desc") : "id";
    let article_id, parent_comment_id;
    if (type === 0) article_id = v.get("query.article_id");
    else if (type === 1) parent_comment_id = v.get("query.parent_comment_id");
    let keyword = v.get("query.keyword");
    const perPageCount = 12;

    let filter = {};
    if (keyword) {
      filter = {
        [Op.or]: [
          { content: { [Op.like]: `%${keyword}%` } },
          { nickname: { [Op.like]: `%${keyword}%` } }
        ]
      };
    }

    if (article_id) {
      filter.article_id = article_id;
    }

    if (parent_comment_id) {
      filter.parent_comment_id = parent_comment_id;
    }

    let tempModel;
    if (type === 0) tempModel = Comment;
    else if (type === 1) tempModel = CommentReply;
    else tempModel = CommentAdvise;
    let commentList = await tempModel.findAndCountAll({
      limit: perPageCount,
      offset: (page - 1) * perPageCount,
      where: filter,
      order: [
        [desc, "DESC"]
      ],
      paranoid: false
    });

    if (!commentList) {
      throw new NotFound({
        msg: "无法获取评论"
      });
    }

    let tempDate = {};
    tempDate.date = [];
    if (commentList.rows) {
      for (let i = 0; i < commentList.rows.length; i++) {
        let item = commentList.rows[i];
        let tempItem;
        if (type === 0) tempItem = CommentDao.transformCommentDate(item, true);
        else if ((type === 1)) tempItem = CommentDao.transformReplyDate(item, true);
        else tempItem = CommentDao.transformAdviseDate(item);
        tempDate.date.push(tempItem);
      }
    }

    return tempDate;
  }

  // 更新点赞次数
  static async updateCommentLikecount(commentId, type) {
    let comment = null;
    if (type === 0) {
      comment = await Comment.findByPk(commentId);
    }
    else if (type === 1) {
      comment = await CommentReply.findByPk(commentId);
    }
    if (!comment) {
      throw new NotFound({
        msg: "无法获取ID为" + id + "的评论数据"
      });
    }
    if (!comment.likecount) comment.likecount = 1;
    comment.likecount++;
    comment.save();
  }

  static async updateCommentHatecount(commentId, type) {
    let comment = null;
    if (type === 0) {
      comment = await Comment.findByPk(commentId);
    }
    else if (type === 1) {
      comment = await CommentReply.findByPk(commentId);
    }
    if (!comment) {
      throw new NotFound({
        msg: "无法获取ID为" + id + "的评论数据"
      });
    }
    if (!comment.hatecount) comment.hatecount = 0;
    comment.hatecount++;
    comment.save();
  }

  static async updateCommentReportcount(commentId, type) {
    let comment = null;
    if (type === 0) {
      comment = await Comment.findByPk(commentId);
    }
    else if (type === 1) {
      comment = await CommentReply.findByPk(commentId);
    }
    if (!comment) {
      throw new NotFound({
        msg: "无法获取ID为" + id + "的评论数据"
      });
    }
    if (!comment.reportcount) comment.reportcount = 0;
    comment.reportcount++;
    comment.save();
  }

  static async createComment(v) {
    let comment = new Comment();
    comment.nickname = v.get("body.nickname");
    comment.email = v.get("body.email");
    comment.head_icon_id = v.get("body.head_icon_id");
    comment.content = v.get("body.content");
    comment.article_id = v.get("body.article_id");
    comment.likecount = 1;
    comment.reportcount = comment.hatecount = 0;
    await comment.save();
    await ArticleDao.updateArticleCommentcount(comment.article_id);
    return comment.id;
  }

  async createOrUpdateCommentOrReplyWithCms(v, type, isCreate, id) {
    let comment;
    let tempModel;
    if (type === 0) {
      tempModel = Comment;
    } else {
      tempModel = CommentReply;
    }

    if (isCreate) {
      comment = new tempModel();
    }
    else {
      if (id) {
        comment = await tempModel.findOne({
          where: {
            id
          },
          paranoid: false
        });
      }
    }

    if (!comment) {
      throw new NotFound({
        msg: "无法获取ID为" + id + "的评论数据"
      });
    }

    comment.nickname = v.get("body.nickname");
    comment.email = v.get("body.email");
    comment.head_icon_id = v.get("body.head_icon_id");
    comment.content = v.get("body.content");
    comment.likecount = v.get("body.likecount");
    comment.reportcount = v.get("body.reportcount");
    comment.hatecount = v.get("body.hatecount");
    comment.cover_text = v.get("body.cover_text");
    if (type === 0) {
      comment.article_id = v.get("body.article_id");
    } else {
      comment.parent_comment_id = v.get("body.parent_comment_id");
      comment.reply_user_name = v.get("body.reply_user_name");
    }
    await comment.save();

    if (type === 0) {
      if (isCreate) await ArticleDao.updateArticleCommentcount(comment.article_id);
    } else if (type === 1) {
      if (isCreate) {
        let parentComment = await Comment.findByPk(comment.parent_comment_id);
        if (!parentComment) {
          throw new NotFound({
            msg: "无法获取ID为" + comment.parent_comment_id + "的评论数据"
          });
        }
        await ArticleDao.updateArticleCommentcount(parentComment.article_id);
      }
    }

    return comment;
  }

  static async createReply(v) {
    let comment = new CommentReply();
    comment.nickname = v.get("body.nickname");
    comment.email = v.get("body.email");
    comment.head_icon_id = v.get("body.head_icon_id");
    comment.content = v.get("body.content");
    comment.parent_comment_id = v.get("body.parent_comment_id");
    comment.reply_user_name = v.get("body.reply_user_name");
    comment.likecount = 1;
    comment.reportcount = comment.hatecount = 0;
    await comment.save();

    let parentComment = await Comment.findByPk(comment.parent_comment_id);
    if (!parentComment) {
      throw new NotFound({
        msg: "无法获取ID为" + comment.parent_comment_id + "的评论数据"
      });
    }
    await ArticleDao.updateArticleCommentcount(parentComment.article_id);

    return comment.id;
  }

  static async createAdvise(v) {
    let comment = new CommentAdvise();
    comment.nickname = v.get("body.nickname");
    comment.email = v.get("body.email");
    comment.content = v.get("body.content");
    comment.save();
  }

  async recoverCommentorReplyOrAdviseWithCms(v, type) {
    let id = v.get("body.id");
    let tempModel;
    if (type === 0) tempModel = Comment;
    else if (type === 1) tempModel = CommentReply;
    else tempModel = CommentAdvise;
    let comment = await tempModel.update({
      delete_time: null
    }, {
      where: {
        id
      },
      paranoid: false
    });

    if (!comment) {
      throw new NotFound({
        msg: "没有找到id为" + id + "的评论"
      });
    }
  }

  async deleteCommentOrReplyOrAdviseWithCms(id, type) {
    let tempModel;
    if (type === 0) tempModel = Comment;
    else if (type === 1) tempModel = CommentReply;
    else tempModel = CommentAdvise;
    let comment = await tempModel.findOne({
      where: {
        id
      },
      paranoid: false
    });
    if (!comment) {
      throw new NotFound({
        msg: "没有找到id为" + id + "的评论"
      });
    }

    //已被软删除的数据再次删除将会被硬删除
    if (comment.delete_time) {
      await comment.destroy({
        force: true
      });
    } else {
      await comment.destroy();
      if (type === 0) {
        await ArticleDao.updateArticleCommentcount(comment.article_id, true);
      } else if (type === 1) {
        let parentComment = await Comment.findByPk(comment.parent_comment_id);
        if (!parentComment) {
          throw new NotFound({
            msg: "无法获取ID为" + comment.parent_comment_id + "的评论数据"
          });
        }
        await ArticleDao.updateArticleCommentcount(parentComment.article_id, true);
      }
    }
  }
}

module.exports = { CommentDao };