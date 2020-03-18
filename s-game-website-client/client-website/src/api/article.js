import fetch from './fetch';

export default {
  // 获取文章列表
  list(params) {
    return fetch.get('/article/list', params)
  },

  // 获取文章列表
  hotList(params) {
    return fetch.get('/article/hot-list', params)
  },

  /**
   * 搜索文章
   * @param id
   * @returns {*}
   */
  search(params) {
    return fetch.get('/article/search', params)
  },

  like(params) {
    if (params.id) {
      return fetch.get('/article/like/' + params.id);
    }
  },

  detail(params) {
    if (params.id) {
      return fetch.get('/article/' + params.id);
    }else {
      return fetch.get('/article/special', params)
    }
  },
}
