import storage from 'good-storage'

const USER_INFO_KEY = '__user__';
const AUDIO_PLAYER_OPTION_KEY = '__audio_player_option__';
const SEARCH_HISTORY_INFO_KEY = '__search_history__';
const ARTICLE_LIST_KEY = '__article_list__';
const COMMENT_LIST_LIKE_HATE_KEY = '__comment_list_like_hate__';
const COMMENT_LIST_REPORT_KEY = '__comment_list_report_';
const REPLY_LIST_LIKE_HATE_KEY = '__reply_list_like_hate__';
const REPLY_LIST_REPORT_KEY = '__reply_list_report_';

//本地缓存用户评论昵称、邮箱、头像ID
export function saveUserInfo(userInfo) {
  storage.set(USER_INFO_KEY, userInfo);
  return userInfo;
}

//获取搜索历史
export function getSearchHistory() {
  return storage.get(SEARCH_HISTORY_INFO_KEY, []).reverse();
}

export function saveSearchHistory(newDate) {
  let tempDate = storage.get(SEARCH_HISTORY_INFO_KEY, []);
  if (newDate && newDate !== '') {
    let idIndex = tempDate.findIndex(item => (item === newDate));
    if (idIndex >= 0) return tempDate;
    if (tempDate.length >= 5) {
      tempDate.splice(0, 1);
    }
    tempDate.push(newDate);
    storage.set(SEARCH_HISTORY_INFO_KEY, tempDate);
  }
  return tempDate;
}

export function clearSearchHistory() {
  storage.remove(SEARCH_HISTORY_INFO_KEY);
  return true;
}

export function loadUserInfo() {
  return storage.get(USER_INFO_KEY, {})
}

export function clearUserInfo() {
  storage.remove(USER_INFO_KEY)
}

export function saveAudioPlayerOption(newDate) {
  storage.set(AUDIO_PLAYER_OPTION_KEY, newDate)
}

export function loadAudioPlayerOption() {
  return storage.get(AUDIO_PLAYER_OPTION_KEY, null)
}

export function clearAudioPlayerOption() {
  storage.remove(AUDIO_PLAYER_OPTION_KEY)
}

//本地缓存是否点赞过某篇文章
export function saveLikeArticleInfo(articleId) {
  if (!articleId) return;
  let articleIdList = storage.get(ARTICLE_LIST_KEY, []);
  let idIndex = articleIdList.findIndex(item => (item === articleId));
  if (idIndex < 0) {
    articleIdList.push(articleId);
    storage.set(ARTICLE_LIST_KEY, articleIdList);
  }
  return articleIdList;
}

//检查本地缓存是否点赞过某篇文章,点赞过返回true
export function checkLikeArticleInfo(articleId) {
  if (!articleId) return;
  let articleIdList = storage.get(ARTICLE_LIST_KEY, []);
  let idIndex = articleIdList.findIndex(item => (item === articleId));
  return idIndex >= 0;
}

export function clearLikeArticleInfo() {
  storage.remove(ARTICLE_LIST_KEY)
}

//本地缓存是否点赞过某篇评论,commentType 0普通评论 1评论回复  handleType 0like 1hate 2report
export function saveCommentHandleInfo(commentId, commentType, handleType) {
  if (!commentId) return;
  let keyname = commentType === 0 ? 'COMMENT' : 'REPLY' + '_LIST_' + (handleType === 0 ? 'LIKE_HATE' : 'REPORT') + '_KEY';
  let commentList = storage.get(keyname, []);
  let idIndex = commentList.findIndex(item => (item === commentId));
  if (idIndex < 0) {
    commentList.push(commentId);
    storage.set(keyname, commentList);
  }
  return commentList;
}

//检查本地缓存是否点赞过某篇文章,点赞过返回true
export function checkCommentHandleInfo(commentId, commentType, handleType) {
  if (!commentId) return;
  let keyname = commentType === 0 ? 'COMMENT' : 'REPLY' + '_LIST_' + (handleType === 0 ? 'LIKE_HATE' : 'REPORT') + '_KEY';
  let commentIdList = storage.get(keyname, []);
  let idIndex = commentIdList.findIndex(item => (item === commentId));
  return idIndex >= 0;
}

export function clearCommentHandleInfo(commentType, handleType) {
  let keyname = commentType === 0 ? 'COMMENT' : 'REPLY' + '_LIST_' + (handleType === 0 ? 'LIKE_HATE' : 'REPORT') + '_KEY';
  storage.remove(keyname);
}

