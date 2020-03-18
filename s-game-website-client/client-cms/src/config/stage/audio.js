const travelRouter = {
    route: null,
    name: null,
    title: '音乐管理',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-zidingyi',
    filePath: 'views/audio/', // 文件路径
    order: null,
    inNav: true,
    children: [
        {
            title: '新建音乐',
            type: 'view',
            name: 'audioAdd',
            route: '/audio/add',
            filePath: 'views/audio/AudioAdd.vue',
            inNav: true,
            icon: 'iconfont icon-zidingyi',
            permission: ['创建音乐'],
        },
        {
            title: '音乐列表',
            type: 'view',
            name: 'audioList',
            route: '/audio/list',
            filePath: 'views/audio/AudioList.vue',
            inNav: true,
            icon: 'iconfont icon-zidingyi',
            permission: ['查看音乐'],
        },
    ],
}

export default travelRouter
