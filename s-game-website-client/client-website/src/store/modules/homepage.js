import homepage from '../../api/homepage'

const state = {
  homepageDate: null,
};

const mutations = {
  // 设置文章列表
  SET_HOMEPAGE_DATE(state, date) {
    state.homepageDate = date;
  },
};

const actions = {
  async getHomepageDate({state, commit}, params) {
    let res = await homepage.homepageDate(params);
    commit('SET_HOMEPAGE_DATE', res.data);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
