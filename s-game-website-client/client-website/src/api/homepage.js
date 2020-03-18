import fetch from './fetch';

export default {
  homepageDate(params){
   return fetch.get('/homepage',params);
  },
}
