const { InfoCrudMixin } = require("lin-mizar/lin/interface");
const { merge } = require("lodash");
const { Sequelize, Model } = require("sequelize");
const { db } = require("lin-mizar/lin/db");

//管理admin数据表的格式
class Article extends Model {

}

Article.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,//主键
      autoIncrement: true//自增长
    },
    //文章大类
    main_type: {
      type: Sequelize.STRING(50),
      default: "article"
    },
    child_type: Sequelize.STRING(50),//文章小类（news,log,..）
    title: Sequelize.STRING(200),//文章标题
    article_describe: Sequelize.TEXT("medium"),//文章描述
    cover_image_url: Sequelize.STRING(200),//封面图片
    head_bg_url: Sequelize.STRING(200),//head背景图片
    head_media_url: Sequelize.TEXT("medium"),//head
    head_media_param: Sequelize.TEXT("medium"),//head参数
    keywords: Sequelize.STRING(50),//关键词标签
    content: Sequelize.TEXT("long"),//文章内容
    hitcount: {
      type: Sequelize.INTEGER,
      default: 0
    },
    likecount: {
      type: Sequelize.INTEGER,
      default: 0
    },
    commentcount: {
      type: Sequelize.INTEGER,
      default: 0
    },
    //发布者
    author: {
      type: Sequelize.STRING(50),
      default: "佚名"
    },
    //前端板面显示类型 0显示作者和分类等 1不显示
    show_type: {
      type: Sequelize.INTEGER,
      default: 0
    }
  }, merge(
  {
    tableName: "article",
    modelName: "article",
    sequelize: db
  },
  InfoCrudMixin.options
  )
);

module.exports = { Article };