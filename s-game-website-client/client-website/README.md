# client-website

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


若重新install开发环境，需要注意：
1.将element-ui内默认颜色从蓝色修改为页面所需红色
2.将isLoading变量添加到axios/lib/core/mergeConfig变量白名单，否则无法显示loading组件
