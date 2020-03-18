const otherOptionRouter = {
    route: null,
    name: null,
    title: '杂项管理',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-zidingyi',
    filePath: 'views/other-option/', // 文件路径
    order: null,
    inNav: true,
    children: [
        {
            title: '活动弹窗',
            type: 'view',
            name: 'setActivityWindow',
            route: '/other-option/set-activity-window',
            filePath: 'views/other-option/SetActivityWindow.vue',
            inNav: true,
            icon: 'iconfont icon-zidingyi',
            permission: ['查看活动弹窗'],
        },
    ],
}

export default otherOptionRouter
