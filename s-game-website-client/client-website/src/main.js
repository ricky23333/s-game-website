//程序入口文件，初始化vue实例并使用需要的插件,加载各种公共组件
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VueLoaclStorage from 'vue-ls';
import VueLazyLoad from 'vue-lazyload';
import VuePrint from 'vue-print-nb';
import 'lib-flexible/flexible';
import './assets/iconfont/iconfont.css';
import './assets/styles/font.css';

Vue.use(VuePrint);

import 'video.js/dist/video-js.css';
import 'video.js/dist/video-js.min.css';
import 'videojs-flash';

import {
  Message,
  Icon,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Col,
  Pagination,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Select,
  Option,
  Button,
  Carousel,
  CarouselItem,
  Slider,
  Switch,
  Tooltip,
  Radio,
  Checkbox,
} from 'element-ui';

Vue.use(Message);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Col);
Vue.use(Pagination);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Slider);
Vue.use(Switch);
Vue.use(Tooltip);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.prototype.$message = Message;

//是否启动生产消息
Vue.config.productionTip = false;
Vue.use(VueLoaclStorage);
Vue.use(VueLazyLoad, {
  error: 'static/images/homepage/error.svg',
  loading: 'static/images/homepage/spinner.svg',
});

router.beforeEach(async (to, from, next) => {
  let userInfo;
  if (userInfo) {

    try {
      await next();
    } catch (e) {
      await next();
    }

    await next();

  } else {
    await next();
  }
});

router.afterEach(() => {

});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
