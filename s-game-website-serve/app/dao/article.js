const { Op, Sequelize } = require("sequelize");
const { Article } = require("../models/article");
const {
  ParametersException,
  NotFound,
  UserAdmin,
  Forbidden,
  findMetaByAuth,
  unsets
} = require("lin-mizar");

//DAO处理api传递过来的数据，并修改数据库
class ArticleDao {
  // 文章详情
  static async getArticleDetail(id) {
    let article = await Article.findByPk(id);

    if (!article) {
      throw new NotFound({
        msg: "无法获取ID为" + id + "的文章数据"
      });
    }

    await ArticleDao.updateArticleHitcount(article);
    let articleDate = await ArticleDao.transformArticleDate(article);
    articleDate.similar_article = await ArticleDao.getSimilarArticleDate(articleDate);
    return articleDate;
  }

  static async getSpecialArticleDetail(main_type) {
    // 获取关于、用户协议等特殊类型的文章
    const date = await  ArticleDao.getArticleListDate(1, "id", main_type, null, null, 1, false);
    let article;
    if (date && date.rows) {
      article = date.rows[0];
    }
    if (!article) {
      throw new NotFound({
        msg: "无法获取类型为" + main_type + "的文章数据"
      });
    }
    await ArticleDao.updateArticleHitcount(article);
    return await ArticleDao.transformArticleDate(article);
  }

  static async getSimilarArticleDate(oriArticleDate) {
    //获取某篇文章/视频/图集/音频的3篇相似推荐
    //首先获取相同类型与本篇文章子类相同，ID最为相近的，若不够3篇，再获取主类型下ID最近的三篇
    let filter = {};
    if (oriArticleDate.main_type) {
      filter.main_type = oriArticleDate.main_type;
    }

    if (oriArticleDate.child_type) {
      filter.child_type = oriArticleDate.child_type;
    }

    let articleList = await Article.findAndCountAll({
      where: filter,
      order: [
        ["id", "DESC"]
      ]
    });

    let restNum = 3;
    let tempSimilarList = [];
    if (articleList && articleList.rows) {
      let currentIndex = articleList.rows.findIndex(item => (item.id === oriArticleDate.id));
      if (currentIndex >= 0) {
        if (currentIndex > 0) {
          tempSimilarList.push(articleList.rows[currentIndex - 1]);
          restNum--;
        }
        for (let i = currentIndex + 1; i < articleList.rows.length; i++) {
          tempSimilarList.push(articleList.rows[i]);
          restNum--;
          if (restNum <= 0) break;
        }
        if (restNum > 0) {
          for (let m = currentIndex - 2; m >= 0; m--) {
            tempSimilarList.push(articleList.rows[m]);
            restNum--;
            if (restNum <= 0) break;
          }
        }
      }
    }

    if (restNum > 0) {
      filter.child_type = null;
      let articleList2 = await Article.findAndCountAll({
        where: filter,
        order: [
          ["id", "DESC"]
        ]
      });
      if (articleList2 && articleList2.rows) {
        for (let i = 0; i < articleList2.rows.length; i++) {
          tempSimilarList.push(articleList2.rows[i]);
          restNum--;
          if (restNum <= 0) break;
        }
      }
    }
    return await ArticleDao.transformArticleDateList(tempSimilarList, true, true, false, false, false);
  }

  // 文章详情
  async getArticleDetailWithCms(id, v) {
    return await ArticleDao.getArticleDetail(id, v.get("body.main_type"), v.get("body.child_type"), v.get("body.desc"));
  }

  // 更新文章点击次数
  static async updateArticleHitcount(articleData) {
    if (articleData && articleData.length > 0) {
      if (articleData.length) {
        articleData.forEach((item) => {
          item.hitcount++;
          item.save();
        });
      }
      else {
        articleData.hitcount++;
        articleData.save();
      }
    }
  }

  static async updateArticleLikecount(articleId) {
    let article = await Article.findByPk(articleId);
    if (!article) {
      throw new NotFound({
        msg: "无法获取ID为" + id + "的文章数据"
      });
    }
    if (!article.likecount) article.likecount = 0;
    article.likecount++;
    article.save();
  }

  static async updateArticleCommentcount(articleId, isReduce = false) {
    let article = await Article.findByPk(articleId);
    if (!article) {
      throw new NotFound({
        msg: "无法获取ID为" + articleId + "的文章数据"
      });
    }
    if (!article.commentcount) article.commentcount = 0;
    if (isReduce) article.commentcount--;
    else article.commentcount++;
    if (article.commentcount < 0) article.commentcount = 0;
    article.save();
  }

  // 获取文章列表数据
  static async getArticleListDate(page = 1, desc = "id", main_type, child_type, keyword, perPageCount = 3, includeDeleteDate = false) {
    let filter = {};

    // 筛选方式：搜索标题关键字
    if (keyword) {
      filter = {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } },
          { article_describe: { [Op.like]: `%${keyword}%` } }
        ]
      };
    }

    // 筛选方式
    if (!includeDeleteDate) {
      filter.delete_time = null;
    }

    if (main_type) {
      filter.main_type = main_type;
    }

    if (child_type) {
      filter.child_type = child_type;
    }
    let article = await Article.findAndCountAll({
      limit: perPageCount,
      offset: (page - 1) * perPageCount,
      where: filter,
      order: [
        [desc, "DESC"]
      ],
      paranoid: !includeDeleteDate
    });
    if (!article) {
      throw new NotFound({
        msg: "无法获取" + child_type + "数据"
      });
    }

    return article;
  }

  /**
   * 将数据库内数据截取需要的部分传给前端
   */
  static transformArticleDateList(date, includeArticleDescribe, includeCoverImage, includeHeadInfo, includeArticleContent, includePageMeta, pageIndex = 1, perPageCount) {
    const tempDate = {};
    tempDate.date = [];
    let oriDatelist = date;
    if (date.rows) oriDatelist = date.rows;
    oriDatelist.forEach((item) => {
      let tempItem = {
        id: item.id,
        main_type: item.main_type,
        child_type: item.child_type,
        title: item.title,
        hitcount: item.hitcount,
        likecount: item.likecount,
        commentcount: item.commentcount,
        homepage_index: item.homepage_index,
        author: item.author,
        create_at: item.create_time,
        update_at: item.update_time,
        show_type: item.show_type
      };
      if (item.delete_time) tempItem.delete_at = item.delete_time;

      if (includeArticleDescribe) tempItem.article_describe = item.article_describe;
      if (includeCoverImage) tempItem.cover_image_url = item.cover_image_url;
      if (includeHeadInfo) {
        tempItem.head_bg_url = item.head_bg_url;
        tempItem.head_media_url = item.head_media_url;
        tempItem.head_media_param = item.head_media_param;
      }
      if (includeArticleContent) tempItem.content = item.content;

      tempDate.date.push(tempItem);
    });


    if (includePageMeta) tempDate.page_meta = {
      current_page_index: parseInt(pageIndex),
      per_page_count: perPageCount,
      total: date.count,
      total_page_count: Math.ceil(date.count / perPageCount)
    };
    return tempDate;
  }

  static transformArticleDate(date) {
    return {
      id: date.id,
      main_type: date.main_type,
      child_type: date.child_type,
      title: date.title,
      hitcount: date.hitcount,
      likecount: date.likecount,
      commentcount: date.commentcount,
      homepage_index: date.homepage_index,
      author: date.author,
      create_at: date.create_time,
      article_describe: date.article_describe,
      cover_image_url: date.cover_image_url,
      head_bg_url: date.head_bg_url,
      head_media_url: date.head_media_url,
      head_media_param: date.head_media_param,
      content: date.content
    };
  }

  //获取文章列表信息
  static async getArticleList(page, perPageCount = 6, desc, main_type, child_type, keyword) {
    const date = await  ArticleDao.getArticleListDate(page, desc, main_type, child_type, keyword, perPageCount);
    return ArticleDao.transformArticleDateList(date, true, true, false, false, true, page, perPageCount);
  }

  static async getHotArticleList(main_type, child_type) {
    const perPageCount = 5;
    const date = await  ArticleDao.getArticleListDate(1, "likecount", main_type, child_type, null, perPageCount);
    return ArticleDao.transformArticleDateList(date, true, true, false, false, false, null, perPageCount);
  }

  //后台管理系统获取文章
  async getArticleListWithCms(v) {
    let page = v.get("query.page");
    let desc = v.get("query.desc");
    let main_type = v.get("query.main_type");
    let child_type = v.get("query.child_type");
    let keyword = v.get("query.keyword");
    const perPageCount = 12;
    const date = await  ArticleDao.getArticleListDate(page, desc, main_type, child_type, keyword, perPageCount, true);
    return ArticleDao.transformArticleDateList(date, true, true, true, true, true, page, perPageCount);
  }

  async createArticle(v) {
    let article = new Article();

    article.main_type = v.get("body.main_type");
    article.child_type = v.get("body.child_type");
    article.title = v.get("body.title");
    article.article_describe = v.get("body.article_describe");
    article.cover_image_url = v.get("body.cover_image_url");
    article.head_bg_url = v.get("body.head_bg_url");
    article.head_media_url = v.get("body.head_media_url");
    article.head_media_param = v.get("body.head_media_param");
    article.keywords = v.get("body.keywords");
    article.content = v.get("body.content");
    article.hitcount = v.get("body.hitcount");
    article.likecount = v.get("body.likecount");
    article.commentcount = v.get("body.commentcount");
    article.author = v.get("body.author");
    article.show_type = v.get("body.show_type");

    article.save();
  }

  async updateArticle(v, id) {
    let article = await Article.findOne({
      where: {
        id
      },
      paranoid: false
    });

    if (!article) {
      throw new NotFound({
        msg: "没有找到id为" + id + "的文章"
      });
    }

    article.main_type = v.get("body.main_type");
    article.child_type = v.get("body.child_type");
    article.title = v.get("body.title");
    article.article_describe = v.get("body.article_describe");
    article.cover_image_url = v.get("body.cover_image_url");
    article.head_bg_url = v.get("body.head_bg_url");
    article.head_media_url = v.get("body.head_media_url");
    article.head_media_param = v.get("body.head_media_param");
    article.keywords = v.get("body.keywords");
    article.content = v.get("body.content");
    article.hitcount = v.get("body.hitcount");
    article.likecount = v.get("body.likecount");
    article.commentcount = v.get("body.commentcount");
    article.author = v.get("body.author");
    article.show_type = v.get("body.show_type");

    article.save();
  }

  async recoverArticle(v) {
    let id = v.get("body.id");

    const article = await Article.update({
      delete_time: null
    }, {
      where: {
        id
      },
      paranoid: false
    });

    if (!article) {
      throw new NotFound({
        msg: "没有找到id为" + id + "的文章"
      });
    }
  }

  async deleteArticle(v, id) {
    const article = await Article.findOne({
      where: {
        id
      },
      paranoid: false
    });
    if (!article) {
      throw new NotFound({
        msg: "没有找到id为" + id + "的文章"
      });
    }
    //已被软删除的数据再次删除将会被硬删除
    if (article.delete_time) {
      await article.destroy({
        force: true
      });
    } else {
      await article.destroy();
    }
  }
}

module.exports = { ArticleDao };
