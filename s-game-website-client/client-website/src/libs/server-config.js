//axios 基本配置，配置访问的服务端接口路径
import axios from 'axios';

let mainService = {};

//配置 开发测试环境 以及 线上生产环境 服务器端api接口地址
const ajaxUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:4000/v1/client-website' : 'https://server.ahyaya.net/v1/client-website';

mainService.ajax = axios.create({
  baseURL:ajaxUrl,
  timeout:30000
});

mainService.api = ajaxUrl;
mainService.oauthUrl = ajaxUrl;

export default mainService;
