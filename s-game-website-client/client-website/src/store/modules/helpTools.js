const state = {
  showFlag: false,
  helpLineFlag: false,
  fontStyle: 0,
  scaleNum: 100,
  refreshPageFlag: false,
  fontConfig: [
    {
      name: '无',
      fontColor: 'rgba(20,20,20,1.0)',
      backgroundColor: ' rgba(250, 250, 250, 1.0)',
      tip: '默认配色'
    },
    {
      name: '字',
      fontColor: 'rgba(255,255,0,1.0)',
      backgroundColor: ' rgba(0, 0, 255, 1.0)',
      tip: '蓝底黄字配色'
    },
    {
      name: '字',
      fontColor: 'rgba(0,0,255,1.0)',
      backgroundColor: ' rgba(254, 254, 204, 1.0)',
      tip: '黄底蓝字配色'
    },
    {
      name: '字',
      fontColor: 'rgba(255,255,0,1.0)',
      backgroundColor: ' rgba(0, 0, 0, 1.0)',
      tip: '黑底黄字配色'
    },
    {
      name: '字',
      fontColor: 'rgba(0,0,0,1.0)',
      backgroundColor: ' rgba(255, 255, 255, 1.0)',
      tip: '白底黑字配色'
    },
  ],
};

const mutations = {
  SWITCH_SHOW_HIDE(state, b) {
    state.showFlag = b;
  },
  SWITCH_HELP_LINE_SHOW_HIDE(state, b) {
    state.helpLineFlag = b;
  },
  CHANGE_SCALE_NUM(state, num) {
    if (num > 200) num = 200;
    else if (num < 50) num = 50;
    state.scaleNum = num;
  },
  CHANGE_FONT_STYLE_NUM(state, num) {
    state.fontStyle = num;
  },
  CHANGE_REFRESH_PAGE_FLAG(state, b) {
    state.refreshPageFlag = b;
  },
};

const actions = {
  switchFlag({state, commit}) {
    commit('SWITCH_SHOW_HIDE', !state.showFlag);
  },
  switchHideFlag({state, commit}) {
    commit('SWITCH_SHOW_HIDE', false);
  },
  switchHelpLineFlag({state, commit}) {
    commit('SWITCH_HELP_LINE_SHOW_HIDE', !state.helpLineFlag);
  },
  changeScaleNum({state, commit}, newParam) {
    commit('CHANGE_SCALE_NUM', newParam);
  },
  changeFontStyle({state, commit}, newParam) {
    commit('CHANGE_FONT_STYLE_NUM', newParam);
  },
  switchRefreshPageFlag({state, commit}) {
    commit('CHANGE_REFRESH_PAGE_FLAG', !state.refreshPageFlag);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
