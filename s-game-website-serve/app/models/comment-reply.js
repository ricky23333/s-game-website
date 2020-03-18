const { InfoCrudMixin } = require("lin-mizar/lin/interface");
const { merge } = require("lodash");
const { Sequelize, Model } = require("sequelize");
const { db } = require("lin-mizar/lin/db");

class CommentReply extends Model {

}

CommentReply.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,//主键
    autoIncrement: true//自增长
  },
  // 评论人的名字
  nickname: Sequelize.STRING,
  // 评论人的邮箱
  email: Sequelize.STRING,
  // 评论人的头像编号
  head_icon_id: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  // 评论内容
  content: Sequelize.STRING(300),
  //主评论下所有回复评论，不管是否回复的楼主原贴，parent_comment_id都设定为原贴ID
  parent_comment_id: Sequelize.INTEGER,
  //要回复的对象的具体昵称
  reply_user_name: Sequelize.STRING,
  likecount: {
    type: Sequelize.INTEGER,
    default: 1
  },
  hatecount: {
    type: Sequelize.INTEGER,
    default: 0
  },
  reportcount: {
    type: Sequelize.INTEGER,
    default: 0
  },
  cover_text: {
    type: Sequelize.BOOLEAN,
    default: false
  }
}, merge(
  {
    tableName: "comment_reply",
    modelName: "comment_reply",
    sequelize: db,
  },
  InfoCrudMixin.options
));

module.exports = { CommentReply };