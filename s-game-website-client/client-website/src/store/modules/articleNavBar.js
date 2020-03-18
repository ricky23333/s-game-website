const state = {
  articleNavElementIdList: [],
  scrollToCommentFlag: false,
};

const mutations = {
  SET_ARTICLE_NAV_DATE(state, data) {
    state.articleNavElementIdList = data
  },
  SET_SCROLL_FLAG(state) {
    state.scrollToCommentFlag = true
  },
  CANCLE_SCROLL_FLAG(state) {
    state.scrollToCommentFlag = false
  },
};

const actions = {
  setArticleNavDate({state, commit}, date) {
    commit('SET_ARTICLE_NAV_DATE', date);
  },
  setScrollToCommentFlag({state, commit}) {
    commit('SET_SCROLL_FLAG');
  },
  cancleScrollToCommentFlag({state, commit}) {
    commit('CANCLE_SCROLL_FLAG');
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
