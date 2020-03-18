//axios常用方法封装
import MainService from '../libs/server-config';
import qs from 'qs';
import Vue from 'vue';
import store from '../store/index'

//添加全局请求头，异步AJAX请求
MainService.ajax.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest'
}

//请求拦截器 在发送请求前 以及请求错误时 执行
MainService.ajax.interceptors.request.use(config => {
  if (config.isLoading) {
    //开启loading(isLoading属性需要修改axios源文件，添加变量到白名单，否则无法存储)
    store.dispatch('loading/openLoading')
  }

  //获取token
  return config;
}, error => {
  return Promise.reject(error);
});

//响应拦截器 接收到响应后执行
MainService.ajax.interceptors.response.use(response => {
  closeLoading();
  return response;
}, error => {
  switch (error.response.status) {
    case 403:

      break;
  }
  console.log(error.response);
  let errMsg = '错误： ' + error.response.data.error_code + ' ' + error.response.data.msg;
  Vue.prototype.$message({
    message: errMsg,
    type: 'error'
  });

  closeLoading();
  return Promise.reject(error);
});

//延迟关闭loading
function closeLoading() {
  setTimeout(() => {
    store.dispatch('loading/closeLoading')
  }, 100)
}

export default {
  post(url, params = {}) {
    const {username} = params;
    const {isLoading = true} = params;

    return MainService.ajax({
      method: 'post',
      url: url,
      data: qs.stringify(params),
      timeout: 30000,
      auth: {
        username
      },
      isLoading,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
    })
  },

  get(url, params = {}) {
    const {username} = params;
    const {isLoading = true} = params;

    return MainService.ajax({
      method: 'get',
      url: url,
      params,
      auth: {
        username
      },
      isLoading,
    })
  },

  delete(url, params = {}) {
    let {isLoading = true} = params;
    return MainService.ajax({
      method: 'delete',
      url: url,
      params,
      isLoading,
    })
  },

  put(url, params = {}) {
    let {isLoading = true} = params;

    return MainService.ajax({
      method: 'put',
      url: url,
      data: qs.stringify(params),
      isLoading,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
    })
  },
}
