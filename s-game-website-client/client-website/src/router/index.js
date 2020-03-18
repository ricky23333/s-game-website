//启动时默认路由注册入口，把需要的路由组件注册到路由器里
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
//解决跳转到当前页面route报错的问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

import HomepageBody from '../views/homepage/homepage-body.vue';
import ArticlePageBody from '../views/childpage/article-page-body';
import ArticleDetail from '../views/childpage/article-detail';
import NotFoundPage from '../views/childpage/not-found-page.vue';
import SearchPage from '../views/childpage/search-page';

let router = new Router({
  //设置路由模式
  // mode: 'history',
  //切换页面时保存滑动条位置的兼容
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {x: 0, y: 0};
    }
  },

  routes: [
    {
      // 主页 配置为'/'时，访问域名才会自动路由到主页
      path: '/',
      name: '首页',
      redirect: '/homepage'
    },
    {
      path: '/homepage',
      name: '首页',
      component: HomepageBody,
    },
    {
      path: '/article',
      name: '日志',
      component: ArticlePageBody,
    },
    {
      path: '/article/:id',
      name: '日志内容',
      component: ArticleDetail,
    },
    {
      path: '/media',
      name: '媒体',
      component: ArticlePageBody,
    },
    {
      path: '/media/:id',
      name: '媒体内容',
      component: ArticleDetail,
    },
    {
      path: '/about',
      name: '关于',
      component: ArticleDetail,
    },
    {
      path: '/terms',
      name: '用户协议',
      component: ArticleDetail,
    },
    {
      path: '/privacy',
      name: '隐私政策',
      component: ArticleDetail,
    },
    {
      path: '/search',
      name: '搜索',
      component: SearchPage,
    },
    //404界面需要配置到最下方
    {
      path: '*',
      name: '404',
      component: NotFoundPage,
    },
  ]
});

export default router;

