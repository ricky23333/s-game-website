import fetch from './fetch';

export default {
  userData(params){
   return fetch.get('/user/guest',params);
  },
}
