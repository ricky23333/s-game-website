//全局管理loading状态模块
const state = {
  loadingList: [],
  isLoading: true,
};

const mutations = {
  //开启loading
  PUSH_LOADING(state, loadText) {
    state.loadingList.push({
      text: loadText || '加载中'
    });
  },
  //从首项开始依次删除loading
  SHIFT_LOADING(state) {
    state.loadingList.shift();
  },

  //标记是否需要loading
  SHOULD_LOADING(state, isShould) {
    state.isLoading = isShould;
  }
};

const getters = {
  isLoading(state) {
    return state.loadingList.length > 0;
  },

  loadingText(state) {
    return state.loadingList.length > 0 ? state.loadingList[0].text : null;
  }
};

const actions = {
  //启动loading 并且添加loading文本到loading队列
  openLoading(state, loadText) {
    state.commit('PUSH_LOADING', loadText)
  },
  //关闭loading队列内排在最前的项
  closeLoading(state) {
    state.commit('SHIFT_LOADING');
  },
};

export default {
  namespaced:true,
  state,
  mutations,
  getters,
  actions,
}
