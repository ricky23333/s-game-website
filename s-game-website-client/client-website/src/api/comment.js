import fetch from './fetch';

export default {
  createNormal(params) {
    try {
      return fetch.post('/comment/normal', params)
    } catch (e) {
      console.log(e);
    }
  },

  createReply(params) {
    return fetch.post('/comment/reply', params)
  },

  createAdvise(params) {
    return fetch.post('/comment/advise', params)
  },

  likeNormal(params) {
    if (params.id) {
      return fetch.get('/comment/like-normal/' + params.id);
    }
  },

  hateNormal(params) {
    if (params.id) {
      return fetch.get('/comment/hate-normal/' + params.id);
    }
  },

  likeReply(params) {
    if (params.id) {
      return fetch.get('/comment/like-reply/' + params.id);
    }
  },

  hateReply(params) {
    if (params.id) {
      return fetch.get('/comment/hate-reply/' + params.id);
    }
  },

  reportNormal(params) {
    if (params.id) {
      return fetch.get('/comment/report-normal/' + params.id);
    }
  },

  reportReply(params) {
    if (params.id) {
      return fetch.get('/comment/report-reply/' + params.id);
    }
  },

  commentList(params) {
    if (params.id) {
      return fetch.get('/comment/' + params.id);
    }
  },
}
