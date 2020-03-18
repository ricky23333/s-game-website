const { InfoCrudMixin } = require("lin-mizar/lin/interface");
const { merge } = require("lodash");
const { Sequelize, Model } = require("sequelize");
const { db } = require("lin-mizar/lin/db");

//收到的网站建议
class CommentAdvise extends Model {

}

CommentAdvise.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,//主键
    autoIncrement: true//自增长
  },
  // 评论人的名字
  nickname: Sequelize.STRING,
  // 评论人的邮箱
  email: Sequelize.STRING,
  // 评论内容
  content: Sequelize.STRING(300)
}, merge(
  {
    tableName: "comment_advise",
    modelName: "comment_advise",
    sequelize: db
  },
  InfoCrudMixin.options
));

module.exports = { CommentAdvise };