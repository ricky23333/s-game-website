import comment from '../../api/comment'
import article from "../../api/article";
import {checkCommentHandleInfo, saveCommentHandleInfo} from "../../libs/storage";

const state = {
  //标记是否更新当前页面所有评论
  updateAllCommentFlag: false,
  showCommentEditorIndex: {
    normalId: null,
    replyId: null,
  },
  showCommentReportIndex: {
    commentType: null,
    commentId: null,
  },
  commentReportBoxAnimFlag:false,
};

const getters = {
  checkCommentHandle: (state) => (commentId, commentType, handleType) => {
    return checkCommentHandleInfo(commentId, commentType, handleType);
  },
}

const mutations = {
  DISABLE_UPDATE_COMMENT_FLAG(state) {
    state.updateAllCommentFlag = false;
  },
  ENABLE_UPDATE_COMMENT_FLAG(state) {
    state.updateAllCommentFlag = true;
  },
  SET_SHOW_COMMENT_EDITOR_INDEX(state, params) {
    if (params[0] === state.showCommentEditorIndex.normalId && params[1] === state.showCommentEditorIndex.replyId) {
      state.showCommentEditorIndex.normalId = state.showCommentEditorIndex.replyId = null;
    } else {
      state.showCommentEditorIndex.normalId = params[0];
      state.showCommentEditorIndex.replyId = params[1];
    }
  },
  HIDE_COMMENT_EDITOR_INDEX(state) {
    state.showCommentEditorIndex.normalId = state.showCommentEditorIndex.replyId = null;
  },

  SET_SHOW_COMMENT_REPORT_INDEX(state, params) {
    if (params[0] === state.showCommentReportIndex.commentType && params[1] === state.showCommentReportIndex.commentId) {
      state.showCommentReportIndex.commentId = state.showCommentReportIndex.commentType = null;
    } else {
      state.showCommentReportIndex.commentType = params[0];
      state.showCommentReportIndex.commentId = params[1];
    }
  },
  HIDE_COMMENT_REPORT_INDEX(state) {
    state.showCommentReportIndex.commentId = state.showCommentReportIndex.commentType = null;
  },
};

const actions = {
  async createComment({state, commit}, params) {
    if (!params) return;
    let res;
    if (params.commentType === 0) {
      res = await comment.createNormal(params);
    } else if (params.commentType === 1) {
      res = await comment.createReply(params);
    } else {
      res = await comment.createAdvise(params);
    }
    if (res) {
      if (params.commentType !== 2) {
        saveCommentHandleInfo(res.data, params.commentType, 0);
      }
    }
    return res;
  },

  async handleComment({state, commit}, params) {
    if (!params) return;
    let res;
    if (params.commentType === 0) {
      if (params.handleType === 0) {
        res = await comment.likeNormal(params);
      } else if (params.handleType === 1) {
        res = await comment.hateNormal(params);
      } else {
        res = await comment.reportNormal(params);
      }
    } else {
      if (params.handleType === 0) {
        res = await comment.likeReply(params);
      } else if (params.handleType === 1) {
        res = await comment.hateReply(params);
      } else {
        res = await comment.reportReply(params);
      }
    }
    if (res && res.status === 201) {
      if (params.id) {
        saveCommentHandleInfo(params.id, params.commentType, (params.handleType === 2 ? 1 : 0));
      }
      return true;
    }
    return false;
  },

  async getCommentList({state, commit}, params) {
    commit('DISABLE_UPDATE_COMMENT_FLAG');
    let res = await comment.commentList(params);
    return res;
  },

  async enableNeedUpdateComment({state, commit}) {
    commit('ENABLE_UPDATE_COMMENT_FLAG');
  },

  async changeCommentEditorShowIndex({state, commit}, params) {
    commit('SET_SHOW_COMMENT_EDITOR_INDEX', params);
  },

  async hideCommentEditorShowIndex({state, commit}) {
    commit('HIDE_COMMENT_EDITOR_INDEX');
  },

  async showReportCommentBox({state, commit}, params) {
    commit('SET_SHOW_COMMENT_REPORT_INDEX', params);
  },

  async hideReportCommentBox({state, commit}) {
    commit('HIDE_COMMENT_REPORT_INDEX');
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
