const articleRouter = {
    route: null,
    name: null,
    title: '文章管理',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-tushuguanli',
    filePath: 'views/article/', // 文件路径
    order: null,
    inNav: true,
    children: [
        {
            title: '新建文章',
            type: 'view',
            name: 'articleAdd',
            route: '/article/add',
            filePath: 'views/article/ArticleAdd.vue',
            inNav: true,
            icon: 'iconfont icon-tushuguanli',
            permission: ['创建文章'],
        },
        {
            title: '文章列表',
            type: 'view',
            name: 'articleList',
            route: '/article/list',
            filePath: 'views/article/ArticleList.vue',
            inNav: true,
            icon: 'iconfont icon-tushuguanli',
            permission: ['查看文章'],
        },
    ],
}

export default articleRouter
