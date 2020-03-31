import audio from '../../api/audio'
import {
  saveAudioPlayerOption,
  loadAudioPlayerOption,
  clearAudioPlayerOption,
} from '../../libs/storage'

const state = {
  audioListDate: null,
  //未勾选记住我的选择时，仅在刷新前应用音乐播放器设置
  tempAutoPlayOption: false,
  showAudioPlayerFlag: true,
  showAudioOptionBoxFlag: false,
  isPlayingFlag:false,
  //正在播放的文章内的音乐，而非播放器列表内的音乐
  currentPlayingArticleAudioUrl:null,
  currentPlayingArticleAudioCoverUrl:null,
};

const mutations = {
  SET_AUDIO_LIST_DATE(state, date) {
    state.audioListDate = date;
  },
  SET_TEMP_CACHE_AUDIO_PLAYER_OPTION(state, date) {
    state.tempAutoPlayOption = date;
  },
  SHOW_AUDIO_OPTION_BOX(state,) {
    state.showAudioOptionBoxFlag = true;
  },
  HIDE_AUDIO_OPTION_BOX(state,) {
    state.showAudioOptionBoxFlag = false;
  },
  HIDE_AUDIO_PLAYER(state,) {
    state.showAudioPlayerFlag = false;
  },
};

const actions = {
  async getAudioList({state, commit}, params) {
    let res = await audio.list(params);
    if (res && res.data && res.data.length > 0) {
      commit('SET_AUDIO_LIST_DATE', res.data);
    } else {
      commit('SET_TEMP_CACHE_AUDIO_PLAYER_OPTION', false);
    }
  },

  async getLocalAudioPlayerOption({state, commit},) {
    return loadAudioPlayerOption();
  },

  async saveLocalAudioPlayerOption({state, commit}, param) {
    saveAudioPlayerOption(param);
  },

  async clearLocalAudioPlayerOption({state, commit},) {
    clearAudioPlayerOption();
  },

  async saveTempCacheAudioPlayerOption({state, commit}, param) {
    commit('SET_TEMP_CACHE_AUDIO_PLAYER_OPTION', param);
  },

  async hideAudioPlayer({state, commit},) {
    commit('HIDE_AUDIO_PLAYER');
  },

  async showAudioOptionBox({state, commit},) {
    commit('SHOW_AUDIO_OPTION_BOX');
  },

  async hideAudioOptionBox({state, commit},) {
    commit('HIDE_AUDIO_OPTION_BOX');
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
