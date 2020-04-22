//vue状态管理默认入口文件，用于全局参数管理
// import Vue from 'vue';
import Vuex from 'vuex';

// Vue.use(Vuex);

const store = new Vuex.Store({
  mutations: {},
  actions: {},
});

//查询获取所有子模块
const moduleContextAry = require.context('@/store/modules', true, /\.js$/);

//注册模块
registerStoreModules(moduleContextAry);

//创建模块函数
function registerStoreModules(moduleAry) {
  moduleAry.keys().forEach((moduleKey) => {
    store.registerModule(moduleKey.replace(/(^\.\/)|(\.js$)/g, ''), moduleAry(moduleKey).default);
  });
}

export default store;
