const carouselRouter = {
    route: null,
    name: null,
    title: '评论管理',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-zidingyi',
    filePath: 'views/comment/', // 文件路径
    order: null,
    inNav: true,
    children: [
        {
            title: '新建评论',
            type: 'view',
            name: 'commentAdd',
            route: '/comment/add',
            filePath: 'views/comment/CommentAdd.vue',
            inNav: true,
            icon: 'iconfont icon-zidingyi',
            permission: ['创建评论'],
        },
        {
            title: '评论列表',
            type: 'view',
            name: 'commentList',
            route: '/comment/list',
            filePath: 'views/comment/CommentList.vue',
            inNav: true,
            icon: 'iconfont icon-zidingyi',
            permission: ['查看评论'],
        },
        {
            title: '新建回复',
            type: 'view',
            name: 'replyAdd',
            route: '/reply/add',
            filePath: 'views/comment/ReplyAdd.vue',
            inNav: true,
            icon: 'iconfont icon-zidingyi',
            permission: ['创建回复'],
        },
        {
            title: '回复列表',
            type: 'view',
            name: 'replyList',
            route: '/reply/list',
            filePath: 'views/comment/ReplyList.vue',
            inNav: true,
            icon: 'iconfont icon-zidingyi',
            permission: ['查看回复'],
        },
        {
            title: '反馈列表',
            type: 'view',
            name: 'adviseList',
            route: '/advise/list',
            filePath: 'views/comment/AdviseList.vue',
            inNav: true,
            icon: 'iconfont icon-zidingyi',
            permission: ['查看反馈'],
        },
    ],
}

export default carouselRouter
