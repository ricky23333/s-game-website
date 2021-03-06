//axios 基本配置，配置访问的服务端接口路径
import axios from 'Axios';

let mainService = {};

//配置 开发测试环境 以及 线上生产环境 服务器端api接口地址
const ajaxUrl = (process.env.NODE_ENV === 'development' ? 'http://localhost:4000' :'https://' + window.location.host +'/server/api') +'/v1/client-website';

mainService.ajax = axios.create({
  baseURL:ajaxUrl,
  timeout:30000
});

mainService.api = ajaxUrl;
mainService.oauthUrl = ajaxUrl;

export default mainService;
