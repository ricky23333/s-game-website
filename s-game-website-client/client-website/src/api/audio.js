import fetch from './fetch';

export default {
  list(params){
    return fetch.get('/audio/list',params);
  },
}
