const { InfoCrudMixin } = require("lin-mizar/lin/interface");
const { merge } = require("lodash");
const { Sequelize, Model } = require("sequelize");
const { db } = require("lin-mizar/lin/db");

class Comment extends Model {

}

Comment.init({
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
  article_id: Sequelize.INTEGER,
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
    tableName: "comment",
    modelName: "comment",
    sequelize: db,
  },
  InfoCrudMixin.options
));

module.exports = { Comment };