import article from '../../api/article'
import {saveLikeArticleInfo, checkLikeArticleInfo, clearLikeArticleInfo,} from '../../libs/storage'
import fetch from "../../api/fetch";

const state = {
  // 文章
  articleList: [],
  // 热门文章
  hotArticleList: [],
  // 分页
  pagination: null,
  // 文章详情
  articleDetail: null,
  //搜索结果
  searchArticleList: [],
  // 分页
  searchArticlePagination: null,
  //搜索结果
  searchMediaList: [],
  // 分页
  searchMediaPagination: null,
};

const getters = {
  // 单个参数
  checkLikeArticle: (state) => (articleId) => {
    return checkLikeArticleInfo(articleId);
  },
}
const mutations = {
  // 设置文章列表
  SET_ARTICLE_LIST(state, list) {
    state.articleList = list
  },
  SET_HOT_ARTICLE_LIST(state, list) {
    state.hotArticleList = list
  },
  // 设置文章分页
  SET_PAGINATION(state, page) {
    state.pagination = page
  },
  // 设置文章详情
  SET_ARTICLE_DETAIL(state, data) {
    state.articleDetail = data
  },

  SET_SEARCH_ARTICLE_LIST(state, list) {
    state.searchArticleList = list
  },
  SET_SEARCH_ARTICLE_PAGINATION(state, page) {
    state.searchArticlePagination = page
  },
  SET_SEARCH_MEDIA_LIST(state, list) {
    state.searchMediaList = list
  },
  SET_SEARCH_MEDIA_PAGINATION(state, page) {
    state.searchMediaPagination = page
  },
};

const actions = {
  /**
   * 获取文章列表
   * @param state
   * @param commit
   * @param params
   * @returns {Promise<void>}
   */
  async getArticleList({state, commit}, params) {
    let res = await article.list(params);
    commit('SET_ARTICLE_LIST', res.data.date);
    commit('SET_PAGINATION', res.data.page_meta);
    return res;
  },

  async getHotArticleList({state, commit}, params) {
    //获取点赞数前五的文章
    let res = await article.hotList(params);
    commit('SET_HOT_ARTICLE_LIST', res.data.date);
    return res;
  },

  /**
   * 获取文章详情信息
   * @param state
   * @param commit
   * @returns {Promise<void>}
   */
  async getArticleDetail({state, commit}, params) {
    let res = await article.detail(params);
    if (res.data) {
      commit('SET_ARTICLE_DETAIL', res.data);
    }
    return res;
  },
  /**
   * 搜索文章详情信息
   * @param state
   * @param commit
   * @returns {Promise<void>}
   */
  async searchArticle({state, commit}, params) {
    let res = await article.search(params);
    if(params.main_type==='article'){
      commit('SET_SEARCH_ARTICLE_LIST', res.data.date);
      commit('SET_SEARCH_ARTICLE_PAGINATION', res.data.page_meta);
    }else if(params.main_type==='media'){
      commit('SET_SEARCH_MEDIA_LIST', res.data.date);
      commit('SET_SEARCH_MEDIA_PAGINATION', res.data.page_meta);
    }
    return res;
  },

  async likeArticle({state, commit}, params) {
    let res = await article.like(params);
    if (res && res.status === 201) {
      if (params.id) {
        saveLikeArticleInfo(params.id);
      }
      return true;
    }
    return false;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
